
import React from 'react';

const DesignSpecs: React.FC = () => {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">设计规范配置</h1>
          <p className="text-slate-500 text-sm">AI 将基于这些规则对您的设计进行检测</p>
        </div>
        <button className="px-6 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all">
          保存规范
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
            <span className="text-blue-600">🎨</span> 品牌色彩库
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-slate-600">品牌主色</label>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-slate-400">#2563EB</span>
                <input type="color" defaultValue="#2563EB" className="w-8 h-8 rounded-lg cursor-pointer border-none" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-slate-600">辅助色</label>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-slate-400">#4F46E5</span>
                <input type="color" defaultValue="#4F46E5" className="w-8 h-8 rounded-lg cursor-pointer border-none" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-slate-600">成功色</label>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-slate-400">#22C55E</span>
                <input type="color" defaultValue="#22C55E" className="w-8 h-8 rounded-lg cursor-pointer border-none" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
            <span className="text-indigo-600">📐</span> 栅格与间距
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">基准栅格 (px)</label>
              <select className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 outline-none">
                <option>4px</option>
                <option selected>8px</option>
                <option>10px</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">默认圆角 (Radius)</label>
              <div className="flex gap-2">
                {['0px', '4px', '8px', '12px', 'Full'].map(val => (
                  <button key={val} className={`flex-1 py-2 text-xs font-bold rounded-lg border ${val === '8px' ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white text-slate-500 border-slate-200'}`}>
                    {val}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm md:col-span-2">
          <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
            <span className="text-purple-600">🔡</span> 字体与层级
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">主字号 (Regular)</label>
              <input type="number" defaultValue={14} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">标题字号 (H1)</label>
              <input type="number" defaultValue={24} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">最小字号 (Caption)</label>
              <input type="number" defaultValue={12} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignSpecs;
