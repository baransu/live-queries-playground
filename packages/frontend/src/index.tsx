import React from "react";
import ReactDOM from "react-dom";
import { TodoApplication } from "./App";
import { io } from "socket.io-client";
import { createSocketIOGraphQLClient } from "@n1ru4l/socket-io-graphql-client";
import { ExecutionResult, Provider } from "urql";
import { createUrqlClient } from "./urlqClient";
import "todomvc-app-css/index.css";
import type { FetcherResult } from "graphiql";
import type { GraphiQLWidget as GraphiQLWidgetType } from "./GraphiQLWidget";

const socket = io("http://localhost:4000");
const networkInterface = createSocketIOGraphQLClient<ExecutionResult>(socket);
const urqlClient = createUrqlClient(networkInterface);

// we only want GraphiQL in our development environment!
let GraphiQLWidget = (): React.ReactElement | null => null;
if (process.env.NODE_ENV === "development") {
  GraphiQLWidget = () => {
    const [Component, setComponent] = React.useState<
      typeof GraphiQLWidgetType | null
    >(null);

    React.useEffect(() => {
      import("./GraphiQLWidget").then(({ GraphiQLWidget }) => {
        setComponent(() => GraphiQLWidget);
      });
    }, []);

    return Component ? (
      <Component
        fetcher={({ query: operation, variables, operationName }) =>
          networkInterface.execute({
            operation,
            variables,
            operationName,
          }) as AsyncIterableIterator<FetcherResult>
        }
      />
    ) : null;
  };
}

ReactDOM.render(
  <React.StrictMode>
    <Provider value={urqlClient}>
      <TodoApplication />
      <GraphiQLWidget />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
