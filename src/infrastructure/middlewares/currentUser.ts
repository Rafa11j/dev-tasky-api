import { Action } from 'routing-controllers';

const currentUserId = async (action: Action): Promise<string> => {
  const userId = action.request.user.id;
  return userId;
};

export { currentUserId };
