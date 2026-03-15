export interface OrthoClassification {
  Bone_Region: string;
  Classification_Name: string;
  Type_Description: string;
  Management: string;
}

export interface BoneRegion {
  id: string;
  name: string;
  classifications: OrthoClassification[];
}

export interface GroupedClassifications {
  [key: string]: OrthoClassification[];
}
