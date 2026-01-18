export interface MessageEnvelope<T> {
  id: string;
  type: string;
  timestamp: string;
  payload: T;
}
