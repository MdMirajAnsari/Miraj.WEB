export interface CourseTopic {
  title: string;
  points: string[];
}

export interface CoursePhase {
  phase: string;
  title: string;
  topics: CourseTopic[];
}

export interface CourseReason {
  icon: string;
  title: string;
  desc: string;
}
