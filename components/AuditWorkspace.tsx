
import React, { useState, useRef } from 'react';
import { analyzeUIDesign, autoCorrectUI, chatWithPro } from '../services/geminiService';
import { UIIssue, IssueCategory, Severity } from '../types';

const AuditWorkspace: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [correctedImage, setCorrectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isCorrecting, setIsCorrecting] = useState(false);
  const [issues, setIssues] = useState<UIIssue[]>([]);
  const [activeIssue, setActiveIssue] = useState<string | null>(null);
  const [activeMode, setActiveMode] = useState<'original' | 'compare'>('original');
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<{role: string, content: string}[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
        setIssues([]);
        setCorrectedImage(null);
        setActiveMode('original');
      };
      reader.readAsDataURL(file);
    }
  };

  const startAnalysis = async () => {
    if (!image) return;
    setIsAnalyzing(true);
    try {
      const result = await analyzeUIDesign(image);
      setIssues(result);
    } catch (err) {
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleAutoCorrect = async () => {
    if (!image) return;
    setIsCorrecting(true);
    try {
      const instruction = issues.map(i => `${i.title}: ${i.suggestion}`).join("; ");
      const corrected = await autoCorrectUI(image, instruction);
      if (corrected) {
        setCorrectedImage(corrected);
        setActiveMode('compare');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsCorrecting(false);
    }
  };

  const handleChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;
    
    const msg = chatMessage;
    setChatHistory(prev => [...prev, { role: 'user', content: msg }]);
    setChatMessage('');
    
    try {
      const response = await chatWithPro(msg, image || undefined);
      setChatHistory(prev => [...prev, { role: 'ai', content: response || "抱歉，我无法处理该请求。" }]);
    } catch (err) {
      console.error(err);
    }
  };

  const getSeverityColor = (sev: Severity) => {
    switch (sev) {
      case Severity.CRITICAL: return 'bg-red-100 text-red-700 border-red-200';
      case Severity.WARNING: return 'bg-amber-100 text-amber-700 border-amber-200';
      case Severity.SUGGESTION: return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="flex-1 flex overflow-hidden">
      {/* 主视图区域 */}
      <div className="flex-1 flex flex-col bg-slate-100 overflow-hidden relative">
        <header className="h-16 border-b bg-white flex items-center justify-between px-6 z-10 shrink-0">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-sm font-medium transition-colors"
            >
              上传设计图
            </button>
            <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept="image/*" />
            
            {image && (
              <div className="flex items-center gap-1 bg-slate-50 border rounded-lg p-1">
                <button 
                  onClick={() => setActiveMode('original')}
                  className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${activeMode === 'original' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500'}`}
                >
                  单屏视图
                </button>
                <button 
                  onClick={() => setActiveMode('compare')}
                  className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${activeMode === 'compare' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500'}`}
                  disabled={!correctedImage}
                  title={!correctedImage ? "请先完成 AI 一键修复" : ""}
                >
                  双屏对比
                </button>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            {!issues.length && image && (
              <button 
                onClick={startAnalysis}
                disabled={isAnalyzing}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium shadow-md shadow-blue-200 disabled:opacity-50 flex items-center gap-2"
              >
                {isAnalyzing ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : '🚀 启动 AI 审核'}
              </button>
            )}
            {issues.length > 0 && !correctedImage && (
              <button 
                onClick={handleAutoCorrect}
                disabled={isCorrecting}
                className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium shadow-md shadow-indigo-200 disabled:opacity-50 flex items-center gap-2"
              >
                 {isCorrecting ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : '✨ AI 一键修复'}
              </button>
            )}
          </div>
        </header>

        <main className="flex-1 overflow-auto p-4 md:p-8 flex items-center justify-center bg-slate-200/50">
          {!image ? (
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="w-full max-w-2xl aspect-video border-2 border-dashed border-slate-300 bg-white rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 hover:bg-blue-50/30 transition-all group"
            >
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">🖼️</div>
              <p className="text-slate-600 font-medium">拖拽 UI 截图或点击上传</p>
              <p className="text-slate-400 text-sm mt-2">支持 PNG, JPG, PSD 导出图, Figma 截图等</p>
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center p-4">
              {activeMode === 'original' ? (
                <div className="relative max-w-full max-h-full flex items-center justify-center group">
                  <div className="relative inline-block shadow-2xl rounded-lg overflow-hidden border bg-white">
                    <img 
                      src={image} 
                      alt="Original" 
                      className="max-w-full max-h-[calc(100vh-160px)] object-contain block" 
                    />
                    {/* 问题标记层 */}
                    <div className="absolute inset-0 pointer-events-none">
                      {issues.map((issue) => issue.location && (
                        <div 
                          key={issue.id}
                          className={`absolute border-2 rounded-sm cursor-pointer pointer-events-auto transition-all hover:scale-105 ${activeIssue === issue.id ? 'ring-4 ring-blue-400/50 z-30' : 'opacity-80'}`}
                          style={{
                            left: `${issue.location.x}%`,
                            top: `${issue.location.y}%`,
                            width: `${issue.location.width}%`,
                            height: `${issue.location.height}%`,
                            borderColor: issue.severity === Severity.CRITICAL ? '#ef4444' : issue.severity === Severity.WARNING ? '#f59e0b' : '#3b82f6'
                          }}
                          onMouseEnter={() => setActiveIssue(issue.id)}
                        >
                          <div className={`absolute -top-7 left-0 px-2 py-1 bg-slate-900 text-white text-[10px] whitespace-nowrap rounded shadow-lg transition-opacity ${activeIssue === issue.id ? 'opacity-100' : 'opacity-0'}`}>
                            {issue.title}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="w-full h-full flex flex-row gap-6 items-center justify-center overflow-hidden">
                  <div className="flex-1 h-full flex flex-col min-w-0">
                    <p className="text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider text-center">原始设计</p>
                    <div className="flex-1 flex items-center justify-center overflow-hidden bg-white/50 rounded-xl border border-slate-300 shadow-inner p-2">
                      <img 
                        src={image} 
                        alt="Original" 
                        className="max-w-full max-h-full object-contain shadow-lg rounded border border-slate-200 grayscale-[0.3]" 
                      />
                    </div>
                  </div>
                  <div className="flex-1 h-full flex flex-col min-w-0">
                    <p className="text-xs font-bold text-blue-600 mb-2 uppercase tracking-wider text-center flex items-center justify-center gap-1">
                      <span className="animate-pulse">✨</span> AI 修复后
                    </p>
                    <div className="flex-1 flex items-center justify-center overflow-hidden bg-white/50 rounded-xl border border-blue-200 shadow-inner p-2">
                      <img 
                        src={correctedImage || image} 
                        alt="Corrected" 
                        className="max-w-full max-h-full object-contain shadow-lg rounded border border-blue-400" 
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      {/* 右侧面板 (问题列表 & AI 助手) */}
      <div className="w-96 border-l bg-white flex flex-col shrink-0">
        <div className="flex border-b shrink-0">
          <button className="flex-1 py-4 text-sm font-bold border-b-2 border-blue-600 text-blue-600">审计报告</button>
          <button className="flex-1 py-4 text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors">专家问答</button>
        </div>

        <div className="flex-1 overflow-auto p-4 space-y-4 scrollbar-hide">
          {!issues.length && !isAnalyzing ? (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-50 px-8">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-4xl mb-6">🤖</div>
              <p className="text-sm font-bold text-slate-700">等待扫描设计图</p>
              <p className="text-xs text-slate-500 mt-2">上传一张 UI 截图并启动 AI 审核，我们将为您检测视觉规范、层级逻辑等问题。</p>
            </div>
          ) : isAnalyzing ? (
            <div className="space-y-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="animate-pulse bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <div className="h-4 bg-slate-200 rounded w-1/3 mb-4" />
                  <div className="space-y-2">
                    <div className="h-3 bg-slate-100 rounded w-full" />
                    <div className="h-3 bg-slate-100 rounded w-5/6" />
                  </div>
                </div>
              ))}
              <div className="text-center py-6 bg-blue-50/50 rounded-2xl border border-blue-100 border-dashed">
                <p className="text-xs text-blue-600 font-black animate-pulse uppercase tracking-widest">正在运行深度视觉神经网络分析...</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4 pb-4">
              <div className="flex items-center justify-between mb-2 px-1">
                <span className="text-xs font-black text-slate-400 uppercase tracking-widest">发现 {issues.length} 个问题</span>
                <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">质量评分: {(100 - issues.length * 3).toFixed(0)}</span>
              </div>
              {issues.map((issue) => (
                <div 
                  key={issue.id}
                  onMouseEnter={() => setActiveIssue(issue.id)}
                  className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer group ${activeIssue === issue.id ? 'border-blue-500 bg-blue-50/40 shadow-xl shadow-blue-500/10 -translate-y-1' : 'border-slate-100 hover:border-slate-200 bg-white'}`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className={`px-2 py-1 rounded-lg text-[10px] font-black uppercase ${getSeverityColor(issue.severity)}`}>
                      {issue.severity}
                    </span>
                    <span className="text-[10px] text-slate-400 font-black uppercase tracking-tighter">{issue.category}</span>
                  </div>
                  <h3 className="text-sm font-black text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">{issue.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed mb-4">{issue.description}</p>
                  <div className="bg-white rounded-xl border border-blue-100 p-3 shadow-sm group-hover:border-blue-300 transition-colors">
                    <div className="flex items-center gap-1.5 mb-1.5 text-blue-600">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                      <span className="text-[10px] font-black uppercase tracking-wider">智能修正建议</span>
                    </div>
                    <p className="text-xs text-slate-700 font-medium leading-relaxed">{issue.suggestion}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* AI 迷你聊天 */}
        <div className="border-t p-4 bg-slate-50 shrink-0">
          <form onSubmit={handleChat} className="flex flex-col gap-2">
             <div className="max-h-32 overflow-auto text-[10px] space-y-2 mb-2 scrollbar-hide">
               {chatHistory.slice(-2).map((c, i) => (
                 <div key={i} className={`p-2 rounded-xl shadow-sm border ${c.role === 'user' ? 'bg-blue-600 text-white border-blue-500 ml-6' : 'bg-white text-slate-700 border-slate-200 mr-6'}`}>
                   <p className="font-black mb-1 text-[8px] uppercase tracking-widest opacity-70">{c.role === 'user' ? '你' : 'AI 专家'}</p>
                   <p className="leading-normal">{c.content}</p>
                 </div>
               ))}
             </div>
             <div className="relative group">
               <input 
                 type="text" 
                 value={chatMessage}
                 onChange={(e) => setChatMessage(e.target.value)}
                 placeholder="询问关于设计的任何细节..."
                 className="w-full pl-4 pr-12 py-3 bg-white border border-slate-200 rounded-2xl text-xs font-medium focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-400 transition-all"
               />
               <button type="submit" className="absolute right-2 top-2 p-1.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 active:scale-95 transition-all shadow-lg shadow-blue-200">
                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
               </button>
             </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuditWorkspace;
