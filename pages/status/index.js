import useSWR from "swr";

async function fetchAPI(key) {
  const response = await fetch(key);
  const responseBody = await response.json();
  return responseBody;
}

export default function StatusPage() {
  return (
    <>
      <h1>Status</h1>
      <UpdatedAt />
      <DatabaseStatus />
    </>
  );
}

function UpdatedAt() {
  const { isLoading, data } = useSWR("api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let updatedAtText = "Loading...";

  if (!isLoading && data) {
    updatedAtText = new Date(data.updated_at).toLocaleString("pt-BR");
  }

  return <div>Última atualização: {updatedAtText}</div>;
}

function DatabaseStatus() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let versionText = "Loading...";
  let openedConnectionsText = "Loading...";
  let maxConnectionsText = "Loading...";

  if (!isLoading && data) {
    versionText = data.dependencies.database.version;
    openedConnectionsText = data.dependencies.database.opened_connections;
    maxConnectionsText = data.dependencies.database.max_connections;
  }

  return (
    <>
      <h2>Banco de Dados</h2>
      <div>Versão: {versionText}</div>
      <div>Conexões Abertas: {openedConnectionsText}</div>
      <div>Conexões Máximas: {maxConnectionsText}</div>
    </>
  );
}
