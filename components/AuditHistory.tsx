
import React from 'react';

const AuditHistory: React.FC = () => {
  const history = [
    { id: 1, name: '移动端首页改版', date: '2024-03-10', issues: 14, score: '88', status: '已修复' },
    { id: 2, name: '电商详情页', date: '2024-03-08', issues: 5, score: '95', status: '待审核' },
    { id: 3, name: '个人中心 - 黑暗模式', date: '2024-03-05', issues: 22, score: '72', status: '进行中' },
    { id: 4, name: '登录/注册全流程', date: '2024-03-01', issues: 0, score: '100', status: '完美' },
  ];

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-slate-900">审计记录历史</h1>
        <div className="flex gap-2">
          <input type="text" placeholder="搜索项目..." className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 outline-none w-64" />
          <button className="p-2 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
            <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path></svg>
          </button>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">项目名称</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">审计日期</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">发现问题</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">评分</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">状态</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {history.map((item) => (
              <tr key={item.id} className="hover:bg-blue-50/30 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-100 rounded-lg overflow-hidden border border-slate-200">
                      <img src={`https://picsum.photos/80/80?random=${item.id}`} className="w-full h-full object-cover" />
                    </div>
                    <span className="text-sm font-bold text-slate-900">{item.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-slate-500 font-medium">{item.date}</td>
                <td className="px-6 py-4 text-sm font-bold text-red-500">{item.issues} 个</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 w-16 bg-slate-100 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${parseInt(item.score) > 90 ? 'bg-green-500' : 'bg-blue-500'}`} style={{ width: `${item.score}%` }}></div>
                    </div>
                    <span className="text-sm font-black text-slate-800">{item.score}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-lg text-[10px] font-black uppercase ${
                    item.status === '完美' ? 'bg-green-100 text-green-700' :
                    item.status === '已修复' ? 'bg-blue-100 text-blue-700' :
                    'bg-amber-100 text-amber-700'
                  }`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button className="text-blue-600 hover:text-blue-800 font-bold text-xs">详情 →</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AuditHistory;
