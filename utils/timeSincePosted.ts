import moment from 'moment';

export const timeSincePosted = (datePosted: number) => {
  const timeSince = moment(datePosted).fromNow();
  return timeSince;
};
