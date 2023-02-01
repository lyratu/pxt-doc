import{_ as s,c as a,o as n,a as e}from"./app.b666acaa.js";const h=JSON.parse('{"title":"模拟器","description":"","frontmatter":{},"headers":[{"level":3,"title":"枚举","slug":"枚举","link":"#枚举","children":[]},{"level":2,"title":"编译到 ARM 本机代码","slug":"编译到-arm-本机代码","link":"#编译到-arm-本机代码","children":[]},{"level":2,"title":"异步函数","slug":"异步函数","link":"#异步函数","children":[]},{"level":2,"title":"离线支持","slug":"离线支持","link":"#离线支持","children":[]},{"level":2,"title":"消息模拟器","slug":"消息模拟器","link":"#消息模拟器","children":[]}],"relativePath":"guide/simulator.md"}'),l={name:"guide/simulator.md"},o=e(`<h1 id="模拟器" tabindex="-1">模拟器 <a class="header-anchor" href="#模拟器" aria-hidden="true">#</a></h1><h3 id="枚举" tabindex="-1">枚举 <a class="header-anchor" href="#枚举" aria-hidden="true">#</a></h3><p>如果将枚举（和接口）放在库中的文件中，然后从模拟器中引用这些文件，则可以在模拟器和目标库之间共享它们。<code>.d.ts</code></p><h2 id="编译到-arm-本机代码" tabindex="-1">编译到 ARM 本机代码 <a class="header-anchor" href="#编译到-arm-本机代码" aria-hidden="true">#</a></h2><p>若您的目标平台与 ARM Mbed 兼容，PXT 将能够在浏览器中将程序编译为 ARM 机器代码。我们建议与团队联系，以帮助您开始此主题。</p><h2 id="异步函数" tabindex="-1">异步函数 <a class="header-anchor" href="#异步函数" aria-hidden="true">#</a></h2><p>PXT 支持协作多线程和隐式异步函数。<a href="https://makecode.com/async" target="_blank" rel="noreferrer">查看更多</a></p><h2 id="离线支持" tabindex="-1">离线支持 <a class="header-anchor" href="#离线支持" aria-hidden="true">#</a></h2><p>如果模拟器引用了图像或外部资源，那么它在脱机时可能无法工作。您可以通过为 PXT 创建的模拟器配置服务工作程序来解决这个问题。在目标文件夹中，添加一个名为<code>sim/public</code> <code>workerConfig.js</code>的文件，内容如下：</p><div class="language-typescript"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">self</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">setSimulatorWorkerOptions</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">urls</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> []</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span></code></pre></div><p>放置在 URL 数组中的所有 URL 将与其他模拟器文件一起缓存。如果 URL 位于目标的文件夹中，则可以像这样引用它们：。路径组件将被 PXT 自动修补到完整的 URL 中以获取资源。<code>sim/public</code> <code>/sim/myFile.png</code> <code>/sim/</code></p><p><strong>警告：</strong> 确保添加到此阵列的所有 URL 都存在。如果这些 URL 中的任何一个未能解析，服务工作人员将不会安装，模拟器也不会脱机缓存。</p><h2 id="消息模拟器" tabindex="-1">消息模拟器 <a class="header-anchor" href="#消息模拟器" aria-hidden="true">#</a></h2><p>一旦检测到控制 sim 消息的特定信道，就可以注册将产生的外部模拟器。此功能用于生成特定于域的模拟器。</p><p>要启用此场景，您必须在字段下添加控制消息通道到模拟器 URL（和其他选项）的映射：<code>pxtarget.json</code> <code>simulator.messageSimulators</code></p><div class="language-typescript"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">...</span></span>
<span class="line"><span style="color:#FFCB6B;">simulator</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">...</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#FFCB6B;">messageSimulators</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#89DDFF;">...</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">mychannel</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">: </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">            </span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">url</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">url of the simulator$PARENT_ORIGIN$</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><p>加载消息模拟器URL时，MakeCode会以编辑器的URI编码来源扩展。您可以使用此值来验证iframe消息的来源。<code>$PARENT_ORIGIN$</code></p><p>可选地，您可以指定将在本地开发模式中使用的. <code>localHostUrl</code></p>`,18),p=[o];function t(c,r,i,d,F,D){return n(),a("div",null,p)}const u=s(l,[["render",t]]);export{h as __pageData,u as default};