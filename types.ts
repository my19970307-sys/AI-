
export enum IssueCategory {
  VISUAL = '视觉规范',
  HIERARCHY = '层级逻辑',
  USABILITY = '可用性',
  DETAIL = '细节打磨'
}

export enum Severity {
  CRITICAL = '严重',
  WARNING = '警告',
  SUGGESTION = '建议'
}

export interface UIIssue {
  id: string;
  category: IssueCategory;
  severity: Severity;
  title: string;
  description: string;
  suggestion: string;
  location?: { x: number; y: number; width: number; height: number };
}

export interface DesignProject {
  id: string;
  name: string;
  imageUrl: string;
  createdAt: string;
  issues: UIIssue[];
  correctedImageUrl?: string;
}

export interface CustomSpec {
  primaryColor: string;
  baseGrid: number;
  fontFamily: string;
  borderRadius: number;
}
