# Chat API

## Message Types

```ts
type IMsgType = "connection" | "message" | "join" | "leave" | "available";
```

## Message

```ts
interface IMsg {
  type: IMsgType;
  message: string;
  id: string;
}
```
