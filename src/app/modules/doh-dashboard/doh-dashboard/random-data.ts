export const data = {
  widget1: [
    {
      title: "OPENED_REPORTS",
      subtitle: "OPENED_REPORTS",
      value: "openIncidents",
      color: "text-muted",
      url: "/incidents/incidents/opened",
    },
    {
      title: "INCOMING_TSKS",
      subtitle: "TASKS",
      value: "incomingTasks",
      color: "text-danger",
      url: "/incidents/tasks/incoming",
    },
    {
      title: "OUTCOMING_TASKS",
      subtitle: "TASKS",
      value: "outGoingTasks",
      color: "text-warning",
      url: "/incidents/tasks/outgoing",
    },
    {
      title: "OUTDATE_TASKS",
      subtitle: "NEED_UP",
      value: "delayedTasks",
      color: "text-dark-50",
      url: "/incidents/tasks/outdate",
    },
    {
      title: "INCOMING_CORRERSPONDENCE",
      subtitle: "OPENED",
      value: "incomingCorrespondence",
      color: "text-dark-65",
      url: "/correspondences-management/correspondences/incoming",
    },
    {
      title: "OUTCOMING_CORRERSPONDENCE",
      subtitle: "OPENED",
      value: "outGoingCorrespondence",
      color: "text-dark-50",
      url: "/correspondences-management/correspondences/outgoing",
    },
  ],
  widget2: [
    {
      title: "LEVEL",
      value: "level5",
      color: "bg-warning",
      icon: "Code/Warning-2",
      level: "5",
      url: "/incidents/incidents/level5",
    },
    {
      title: "LEVEL",
      value: "level4",

      color: "bg-danger",
      icon: "Design/Color-profile",
      level: "4",
      url: "/incidents/incidents/level4",
    },
    {
      title: "LEVEL",
      value: "level6",
      color: "bg-primary",
      icon: "Files/Download",
      level: "6",
      url: "/incidents/incidents/level6",
    },
    {
      title: "LEVEL",
      value: "level7",
      color: "bg-success",
      icon: "General/Fire",
      level: "7",
      url: "/incidents/incidents/level7",
    },
  ],
  widget3: [
    {
      title: "TASKS_STATUS",
      value: [],
      color: "bg-danger",
      keys: ["UNREAD", "COMPLETED", "REVIEWD"],
      chartType: "polarArea",
    },
    {
      title: "CORRERSPONDENCE_PRIORITY",
      value: [],

      color: "bg-danger",
      keys: ["VERY_URGENT", "URGENT", "NORMAL"],
      chartType: "polarArea",
    },
    {
      title: "INJUREDS",
      value: [],

      color: "bg-danger",
      keys: ["HARD", "SIMPLE", "DANGER"],
      chartType: "polarArea",
    },
    {
      title: "DANGER_EFFECT",
      value: [],

      color: "bg-danger",
      keys: ["DANGER", "MEDUIM", "NORMAL"],
      chartType: "polarArea",
    },
    {
      title: "TASKS_PRIORITY",
      value: [],

      color: "bg-danger",
      keys: ["VERY_IMPORTANT", "IMPORTANT", "NORMAL"],
      chartType: "polarArea",
    },
    {
      title: "CORRERSPONDENCE_STATUS",
      value: [],

      color: "bg-danger",
      keys: ["COMPLETED", "REVIEWD", "UNREAD"],
      chartType: "polarArea",
    },
    {
      title: "DEATHS",
      value: [],

      color: "bg-danger",
      keys: ["ADULTS", "CHILDRENS"],
      chartType: "polarArea",
    },
    {
      title: "REPORTS_STATUS",
      value: [],

      keys: ["PROCESSING", "CLOSED"],
      chartType: "polarArea",
    },
  ],
};
