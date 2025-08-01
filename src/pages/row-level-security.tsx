// /src/pages/row-level-security.tsx
import { useEffect } from 'react';

export default function RowLevelSecurity() {
  useEffect(() => {
    const pbiContainer = document.getElementById('pbi-rls');
    if (pbiContainer && (window as any).powerbi) {
      (window as any).powerbi.embed(pbiContainer, {
        type: 'report',
        embedUrl: 'https://app.powerbi.com/reportEmbed?reportId=YOUR_REPORT_ID&groupId=YOUR_WORKSPACE_ID',
        tokenType: 1,
        accessToken: 'YOUR_ACCESS_TOKEN',
        settings: {
          panes: { filters: { visible: true }, pageNavigation: { visible: true } },
          background: 'Transparent',
        },
      });
    }
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Row-Level Security</h1>
      <p className="text-gray-600 max-w-2xl">
        This view demonstrates row-level security in action. The Power BI report displayed below should only show data relevant
        to the authenticated user's role or assigned region.
      </p>

      <div className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
        <h3 className="text-sm text-gray-600 mb-2">Power BI Report with RLS</h3>
        <div id="pbi-rls" className="w-full h-[500px] rounded border border-gray-300"></div>
      </div>

      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 text-sm text-blue-800">
        <strong>Note:</strong> In a live production setup, RLS is enforced based on the user's Azure AD or Entra ID role. To test,
        you may simulate different users by applying filters or using test embed tokens.
      </div>
    </div>
  );
}
