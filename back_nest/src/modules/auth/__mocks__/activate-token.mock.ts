import { ActivateTokenEntity } from '../../../database/entities/activate-token.entity';
import { mockUserEntity } from '../../user/__mocks__/user-entity.mock';

export const mockActivateToken: ActivateTokenEntity = {
  id: 25,
  activate: 'token',
  user_id: 1,
  created_at: new Date('05-12-2023'),
  user: mockUserEntity,
};
