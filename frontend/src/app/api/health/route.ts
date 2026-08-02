export async function GET() {
  return Response.json({
    status: 'ok',
    service: 'eduease-frontend',
    timestamp: new Date().toISOString(),
  });
}
