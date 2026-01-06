
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import AuditWorkspace from './components/AuditWorkspace';
import DesignSpecs from './components/DesignSpecs';
import TeamSpace from './components/TeamSpace';
import AuditHistory from './components/AuditHistory';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'audit':
        return <AuditWorkspace />;
      case 'specs':
        return <DesignSpecs />;
      case 'team':
        return <TeamSpace />;
      case 'history':
        return <AuditHistory />;
      case 'dashboard':
        return (
          <div className="p-10 flex-1 overflow-auto bg-slate-50">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h1 className="text-3xl font-black text-slate-900 tracking-tight">你好, 设计师 👋</h1>
                <p className="text-slate-500 mt-2 font-medium">这是你本周的设计审计洞察报告</p>
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={() => setActiveTab('audit')}
                  className="px-6 py-3 bg-blue-600 text-white rounded-2xl font-bold shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all active:scale-95"
                >
                  新建审计项目
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
              {[
                { label: '本月累计审计', value: '128', change: '+12%', color: 'blue', icon: '⚡️' },
                { label: '平均合规率', value: '92.4%', change: '+5.2%', color: 'green', icon: '✅' },
                { label: '待解决问题', value: '43', change: '-18%', color: 'amber', icon: '🧐' },
              ].map((stat) => (
                <div key={stat.label} className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm relative overflow-hidden group hover:shadow-xl transition-all duration-300">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-slate-400 text-xs font-black uppercase tracking-wider mb-2">{stat.label}</p>
                      <p className={`text-4xl font-black text-slate-900 mt-1`}>{stat.value}</p>
                    </div>
                    <div className="text-3xl grayscale group-hover:grayscale-0 transition-all">{stat.icon}</div>
                  </div>
                  <div className="mt-6 flex items-center gap-2">
                    <span className={`text-xs font-bold px-2 py-1 rounded-lg ${stat.change.startsWith('+') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {stat.change}
                    </span>
                    <span className="text-slate-400 text-[10px] font-bold">对比上周</span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
              <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-xl font-black text-slate-900">活跃中的审计项目</h2>
                  <button onClick={() => setActiveTab('history')} className="text-xs font-bold text-blue-600 hover:underline">查看全部</button>
                </div>
                <div className="space-y-6">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-4 group cursor-pointer hover:bg-slate-50 p-2 -m-2 rounded-2xl transition-colors">
                      <div className="w-16 h-16 bg-slate-100 rounded-2xl overflow-hidden border border-slate-200 shadow-inner group-hover:border-blue-300">
                        <img src={`https://picsum.photos/200/200?random=${i + 10}`} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-black text-slate-900">项目：电商 APP v2.0 结算页</p>
                        <p className="text-xs text-slate-400 mt-0.5">最后更新: 2小时前</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-black text-amber-500">8 个待处理</p>
                        <div className="mt-1 h-1.5 w-16 bg-slate-100 rounded-full ml-auto overflow-hidden">
                          <div className="h-full bg-blue-500" style={{ width: '40%' }}></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-xl font-black text-slate-900">AI 优化动态</h2>
                  <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a8 8 0 100 16 8 8 0 000-16zM7 9a1 1 0 012 0v4a1 1 0 11-2 0V9zm4-3a1 1 0 112 0 1 1 0 01-2 0z"></path></svg>
                  </div>
                </div>
                <div className="space-y-4">
                  {[
                    { text: 'AI 自动修正了 "登录页" 的 4 个色彩对比度问题', time: '10分钟前', type: 'success' },
                    { text: '团队规范库已成功同步：Figma Global Styles', time: '1小时前', type: 'info' },
                    { text: '完成一次无障碍深度审计报告导出', time: '昨天', type: 'info' },
                  ].map((log, i) => (
                    <div key={i} className="flex gap-4 items-start border-l-2 border-slate-100 pl-4 py-1">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-slate-700">{log.text}</p>
                        <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase">{log.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="h-full flex items-center justify-center flex-col opacity-60 text-center p-8 bg-slate-50">
            <div className="text-8xl mb-6">🛸</div>
            <h2 className="text-2xl font-black text-slate-900">功能实验室</h2>
            <p className="mt-2 text-slate-500 max-w-sm font-medium">该模块正在由 AI 工程师进行最后调试，不久将开放使用。</p>
            <button onClick={() => setActiveTab('dashboard')} className="mt-8 px-6 py-2 border-2 border-slate-200 rounded-xl text-sm font-bold hover:bg-slate-100 transition-all">返回控制台</button>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-white">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 flex flex-col overflow-hidden">
        {renderContent()}
      </div>
    </div>
  );
};

export default App;
