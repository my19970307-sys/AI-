
import React from 'react';

const TeamSpace: React.FC = () => {
  const members = [
    { name: '王小美', role: 'UI 设计师', status: '活跃', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mei' },
    { name: '李阿强', role: '产品经理', status: '会议中', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Qiang' },
    { name: '陈设计', role: '资深视觉设计师', status: '审计中', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Chen' },
  ];

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-2xl font-black text-slate-900">设计中心团队</h1>
          <p className="text-slate-500 text-sm mt-1">共 3 名活跃成员，共享 12 个项目</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path></svg>
          邀请成员
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {members.map((member, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-blue-300 transition-colors group">
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full border-4 border-slate-50 overflow-hidden mb-4 group-hover:scale-105 transition-transform">
                <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">{member.name}</h3>
              <p className="text-xs text-slate-500 mb-4">{member.role}</p>
              <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${member.status === '活跃' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
                {member.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-blue-50 rounded-3xl p-8 border border-blue-100 relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-xl font-bold text-blue-900 mb-2">团队资源库</h2>
          <p className="text-blue-700/70 text-sm mb-6 max-w-md">在此上传您团队的组件库设计规范（Figma JSON），AI 将自动学习并应用于所有审计任务。</p>
          <div className="flex gap-3">
            <button className="px-6 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition-all">上传规范文件</button>
            <button className="px-6 py-2.5 bg-white text-blue-600 rounded-xl text-xs font-bold border border-blue-200 hover:bg-blue-50 transition-all">查看已上传素材</button>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 text-blue-100 -mr-16 -mt-16 pointer-events-none">
          <svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L1 21h22L12 2zm0 3.45L20.1 19H3.9L12 5.45zM11 10h2v4h-2v-4zm0 6h2v2h-2v-2z"></path></svg>
        </div>
      </div>
    </div>
  );
};

export default TeamSpace;
