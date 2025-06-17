export const updatePhaseDates = async (
  projectId: number,
  phaseId: string,
  startDate: Date,
  endDate: Date,
) => {
  await fetch(`/api/projects/${projectId}/phases/${phaseId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    }),
  });
};
