export type UserType = {
  _id: string,
  birthday: string,
  goals: [GoalType],
  email: string,
  gender: Boolean,
  streaks: [HistoryType],
  startDateTime: string,
  displayName: string,
  nickname: string,
  phone: string,
  bio: string,
  avatar: {
    url: string,
  },
  posts: {
    data: [PostType],
    total: number,
  },
  token: string,
  postScore: number,
  created: boolean,
};

export type HistoryType = {
  startDateTime: number,
  endDateTime: number,
};

type ScreenName =
  | 'SignInScreen'
  | 'SignInModal'
  | 'AuthScreen'
  | 'InitialScreen'
  | 'SelectStartScreen'
  | 'ProgressScreen'
  | 'InitialCreateProfileScreen'
  // profile
  | 'ProfileScreen'
  | 'ProfileDetailScreen'

  // check up
  | 'CheckupScreen'
  | 'CheckupResultScreen'
  | 'CheckupStack'

  // goals
  | 'CommitmentScreen'
  | 'GoalDetailScreen'
  | 'CreateGoalScreen'

  // others
  | 'ContributeScreen'
  | 'SubmitScreen'
  | 'SubmitScreen'
  | 'QuestionScreen'

  // connect
  | 'ConnectScreen'
  | 'WebViewScreen'
  | 'SettingScreen'

  // journal
  | 'JournalScreen'
  | 'CreateJournalScreen'
  | 'JournalDetailScreen'
  // rollcall
  | 'RollCallScreen'
  | 'RollCallHistory'
  | 'FutureLetterScreen'
  | 'FeedbackScreen'
  // post
  | 'PostScreen'
  | 'CreatePostScreen'
  | 'CreatePostImageScreen'
  | 'PostDetailScreen'
  | 'NotificationScreen'
  | 'SupportScreen'
  | 'UserPostScreen'
  | 'CalmScreen'
  | 'QuoteScreen'
  | 'BreathScreen'
  // quiz stack
  | 'QuizScreen';

export type NavigationType = {
  pop: () => void,
  navigate: (screenName: ScreenName) => void,
  push: (screenName: ScreenName) => void,
  goBack: () => void,
  popToTop: () => void,
};

export type NotificationDataType = {
  action: 'NAVIGATE',
  screenName: 'MainApp' | 'UrgeScreen',
};

export type PopupType = {
  title: string,
  description: string,
  onDecline: () => void,
  onConfirm: () => void,
  onClose: () => void,
  modalVisible: Boolean,
  popupType: 'success' | 'confirm' | 'error' | 'prompt' | 'vote',
  grandResponder: Boolean,
  acceptOnly: Boolean,
  confirmLabel: string,
  cancelLabel: string,
  defaultValue?: string,
  keyboardType?: string,
  regex?: String,
  input?: {},
};

export type AppType = {
  popup: PopupType,
  isConnected: Boolean,
  navigationStatus: 'Authenicating' | 'Home' | 'Walkthrough',
};

export type MilestoneType = {
  title: string,
  dayCount: string,
};

export type AchieveInfoType = {
  currentDay: number,
  nextIndex: number,
  currentAchieve: {},
  nextAchieve: {},
  currentTitle: string,
  progress: number,
  currentIndex: number,
  dayNextRank: number,
  startDateTime: number,
  maxAchieve: number,
};

export type SubscribeType = {
  _id: string,
  startDate: Date,
  endDate: Date,
  successDayCount: number,
  status: 'IN_PROGRESS' | 'SUCCEEDED' | 'FAILED',
  futureLetter: string,
};

export type FileType = {
  url: String,
};

export type PostTopicType = {
  _id: string,
  title: string,
  posts: [PostType],
  createdAt: Date,
  updatedAt: Date,
};

export type PostType = {
  _id: string,
  user: UserType,
  postTopic: { title: string },
  title: string,
  content: string,
  image: FileType,
  topScore: number,
  myPostVote: number,
  comments: [CommentType],
  createdAt: Date,
  postTopic: PostTopicType,
};

export type CommentType = {
  _id: string,
  user: UserType,
  post: PostType,
  parent: CommentType,
  content: string,
  notification: boolean,
  comments: {
    total: number,
  },
  createdAt: string,
  updatedAt: string,
  status?: string,
};

export type PostNotificationType = {
  // clone as database
  _id: string,
  user: string,
  post: string,
  comment: string,
  title: string,
  content: string,
  createdAt: Date,
  updatedAt: Date,
  status: 'NEW' | 'SEEN' | 'OPENED',
  receiveNotification: boolean,
  // new attribute for post information
  postDetail?: PostType,
};

export type JournalType = {
  _id: string,
  user: string,
  date: Date,
  content: string,
  image: {
    url: string,
  },
};

export type TrackingType = {
  date: Date,
  point: Number,
};

export type GoalType = {
  _id: String,
  user: String,
  title: String,
  content: String,
  trackings: [TrackingType],
  createdAt: Date,
  updatedAt: Date,
  totalPoint: number,
};
