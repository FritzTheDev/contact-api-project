import { Request } from 'express';

export interface RequestWithUser extends Request {
  // adds the user property to request type so I can use authMiddleware correctly
  user: any;
}