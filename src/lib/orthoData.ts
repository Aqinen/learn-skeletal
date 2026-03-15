import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';
import { OrthoClassification, GroupedClassifications, BoneRegion } from '@/types/ortho';

export async function getOrthoData(): Promise<OrthoClassification[]> {
  const filePath = path.join(process.cwd(), 'ortho_classifications.csv');
  const fileContent = fs.readFileSync(filePath, 'utf8');
  
  return new Promise((resolve, reject) => {
    Papa.parse(fileContent, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        resolve(results.data as OrthoClassification[]);
      },
      error: (error: any) => {
        reject(error);
      }
    });
  });
}

export async function getGroupedClassifications(): Promise<BoneRegion[]> {
  const data = await getOrthoData();
  
  // Group by Bone_Region
  const grouped: GroupedClassifications = data.reduce((acc: GroupedClassifications, item) => {
    const region = item.Bone_Region;
    if (!acc[region]) {
      acc[region] = [];
    }
    acc[region].push(item);
    return acc;
  }, {} as GroupedClassifications);
  
  // Extract bone region names and create BoneRegion objects
  const boneRegions: BoneRegion[] = Object.keys(grouped).map(region => {
    const regionName = region.split(' - ')[1] || region;
    return {
      id: region,
      name: regionName,
      classifications: grouped[region]
    };
  });
  
  // Sort by bone region number (1-12)
  boneRegions.sort((a, b) => {
    const aNum = parseInt(a.id.split(' - ')[0]);
    const bNum = parseInt(b.id.split(' - ')[0]);
    return aNum - bNum;
  });
  
  return boneRegions;
}

export async function getClassificationsByRegion(regionId: string): Promise<OrthoClassification[]> {
  const data = await getOrthoData();
  
  // Find all classifications that match the region (handle cases where multiple entries have same region)
  return data.filter(item => item.Bone_Region === regionId);
}
