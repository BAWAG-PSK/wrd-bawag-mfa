/**
 * Checks if the app is running under `localhost:<port>`.
 * @param port The port
 * @return true if the host is localhost and the port at hand matches, else false
 */
export function isLocalhostOnOwnPort(port: number): boolean {
  return document.location.host === `localhost:${port}`;
}
