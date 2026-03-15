//Viewに合わせた型定義を実装
export type Attendance = 0 | 1 | 2;

export type InviteResponseDto = {
  inviteToken: string;
  attendance: Attendance;
  name: string | null;
  companionsText: string | null;
  allergiesList: string[];
};

export type InviteUpdateRequestDto = {
  attendance: Attendance;
  name: string | null;
  companionsText: string | null;
  allergiesList: string[];
};
