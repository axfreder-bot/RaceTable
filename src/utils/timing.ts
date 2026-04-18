import {MealMoment, WorkoutType} from '../types';

export const getMealTime = (moment: MealMoment, workoutType: WorkoutType, workoutTime: string): string => {
  const times: Record<MealMoment, string> = {
    breakfast: '7:00 AM',
    'pre-run': calculatePreRunTime(workoutTime),
    during: calculateDuringTime(workoutTime),
    'post-run': calculatePostRunTime(workoutTime),
    lunch: '12:30 PM',
    dinner: '7:00 PM',
    'before-bed': '9:30 PM',
  };
  return times[moment];
};

const calculatePreRunTime = (workoutTime: string): string => {
  return subtractMinutes(workoutTime, 90);
};

const calculateDuringTime = (workoutTime: string): string => {
  const [time, period] = workoutTime.split(' ');
  const [hours, minutes] = time.split(':').map(Number);
  const adjusted = period === 'PM' && hours !== 12 ? hours + 12 : hours;
  const start = adjusted * 60 + minutes;
  const mid = start + 45;
  const midHours = Math.floor(mid / 60);
  const midMins = mid % 60;
  const midPeriod = midHours >= 12 ? 'PM' : 'AM';
  const displayHours = midHours > 12 ? midHours - 12 : midHours === 0 ? 12 : midHours;
  return `${displayHours}:${String(midMins).padStart(2, '0')} ${midPeriod}`;
};

const calculatePostRunTime = (workoutTime: string): string => {
  return addMinutes(workoutTime, 60);
};

const subtractMinutes = (timeStr: string, mins: number): string => {
  const [time, period] = timeStr.split(' ');
  const [hours, minutes] = time.split(':').map(Number);
  let totalMins = (period === 'PM' && hours !== 12 ? hours + 12 : hours) * 60 + minutes - mins;
  if (totalMins < 0) totalMins += 24 * 60;
  const newHours = Math.floor(totalMins / 60) % 24;
  const newMins = totalMins % 60;
  const newPeriod = newHours >= 12 ? 'PM' : 'AM';
  const displayHours = newHours > 12 ? newHours - 12 : newHours === 0 ? 12 : newHours;
  return `${displayHours}:${String(newMins).padStart(2, '0')} ${newPeriod}`;
};

const addMinutes = (timeStr: string, mins: number): string => {
  const [time, period] = timeStr.split(' ');
  const [hours, minutes] = time.split(':').map(Number);
  let totalMins = (period === 'PM' && hours !== 12 ? hours + 12 : hours) * 60 + minutes + mins;
  const newHours = Math.floor(totalMins / 60) % 24;
  const newMins = totalMins % 60;
  const newPeriod = newHours >= 12 ? 'PM' : 'AM';
  const displayHours = newHours > 12 ? newHours - 12 : newHours === 0 ? 12 : newHours;
  return `${displayHours}:${String(newMins).padStart(2, '0')} ${newPeriod}`;
};

export const formatTimeOfDay = (timeStr: string): string => {
  const [time, period] = timeStr.split(' ');
  const [hours] = time.split(':').map(Number);
  if (hours >= 5 && hours < 12) return 'Morning';
  if (hours >= 12 && hours < 17) return 'Afternoon';
  if (hours >= 17 && hours < 21) return 'Evening';
  return 'Night';
};

export const getDayOfWeek = (): string => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days[new Date().getDay()];
};

export const getFormattedDate = (): string => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const d = new Date();
  return `${months[d.getMonth()]} ${d.getDate()}`;
};
