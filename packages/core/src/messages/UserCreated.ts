import type { User } from '../domain/User';
import { MessageEnvelope } from './MessageEnvelope';

export type UserCreated = MessageEnvelope<{
  user: User
}>
