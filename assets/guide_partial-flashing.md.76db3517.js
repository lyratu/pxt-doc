import{_ as t,c as e,o as d,a}from"./app.8c9f81b3.js";const b=JSON.parse('{"title":"部分闪烁","description":"","frontmatter":{},"headers":[{"level":3,"title":"这是规范草案","slug":"这是规范草案","link":"#这是规范草案","children":[]},{"level":2,"title":"校验和块","slug":"校验和块","link":"#校验和块","children":[{"level":3,"title":"区域描述符","slug":"区域描述符","link":"#区域描述符","children":[]}]},{"level":2,"title":"典型用途","slug":"典型用途","link":"#典型用途","children":[]},{"level":2,"title":"校验和块的位置","slug":"校验和块的位置","link":"#校验和块的位置","children":[]}],"relativePath":"guide/partial-flashing.md","lastUpdated":1675251710000}'),r={name:"guide/partial-flashing.md"},i=a('<h1 id="部分闪烁" tabindex="-1">部分闪烁 <a class="header-anchor" href="#部分闪烁" aria-hidden="true">#</a></h1><h3 id="这是规范草案" tabindex="-1">这是规范草案 <a class="header-anchor" href="#这是规范草案" aria-hidden="true">#</a></h3><p>当以交互方式工作并频繁刷新设备时，通常只有一小部分程序发生变化（例如，运行时保持不变）。因此，为了获得最佳（最快）用户体验，最好只闪现更改的部分。</p><p>如果在计算机、进行闪烁的 MCU 和正在闪烁的 MCU 之间存在快速链接（最后两个可以相同），那么可以只读取每一页，看看是否需要重新闪烁。这是一个非常健壮、简单和有效的解决方案，例如在 MSD 引导加载程序和没有单独接口芯片的情况下，它非常有效。</p><p>OTOH，如果某些链接速度较慢，最好包含一些元数据以帮助部分闪烁。在各种无线电连接上尤其如此。</p><p>本文档定义了指定闪存区域校验和的格式</p><h2 id="校验和块" tabindex="-1">校验和块 <a class="header-anchor" href="#校验和块" aria-hidden="true">#</a></h2><table><thead><tr><th>Offset</th><th>Size</th><th>Value</th></tr></thead><tbody><tr><td>0</td><td>4</td><td>Magic number: or 0x07eeb07c0x87eeb07c</td></tr><tr><td>4</td><td>4</td><td>Position of end marker (32-bit aligned)</td></tr><tr><td>8</td><td>4</td><td>End marker value and page size</td></tr><tr><td>12</td><td>8</td><td>Region 0</td></tr><tr><td>…</td><td>...</td><td>Region …</td></tr><tr><td>…</td><td>4</td><td>0x00000000 - regions terminator</td></tr></tbody></table><p>所有数字都是 little endian</p><p>magic number 表示引导加载程序应该为频繁的重新刷新进行优化（例如，单击重置按钮一次（而不是双击）后启动）。magic number 表示没有这种偏好。<code>0x87eeb07c</code> <code>0x07eeb07c</code></p><p>结束标记用于减轻部分闪光。它应该是随机的，或者从整个程序的校验和中导出。应将其放置在闪烁过程结束时（通常在程序结束时）写入。闪光过程应检查闪光是否包含指示位置的结束标记。如果没有，整个校验和块应该被视为无效。</p><p>结束标记值的低位字节应包含页面大小，以 2 的幂表示。如果结束标记为，则页面大小为<code>X</code> <code>1 &lt;&lt; (X &amp; 0xff)</code></p><h3 id="区域描述符" tabindex="-1">区域描述符 <a class="header-anchor" href="#区域描述符" aria-hidden="true">#</a></h3><table><thead><tr><th>Offset</th><th>Size</th><th>Value</th></tr></thead><tbody><tr><td>0</td><td>2</td><td>First page</td></tr><tr><td>2</td><td>2</td><td>Number of pages</td></tr><tr><td>4</td><td>4</td><td>Application-specific checksum</td></tr></tbody></table><p>应用程序可以以任何方式计算校验和。例如，可以获取区域内容的 SHA256 的前 4 个字节。</p><p>不需要区域描述符来覆盖整个闪存，甚至闪存文件的整个内容。如果闪存文件中没有给定位置的区域描述符，则应始终闪存该位置。</p><h2 id="典型用途" tabindex="-1">典型用途 <a class="header-anchor" href="#典型用途" aria-hidden="true">#</a></h2><p>例如，在 micro:bit 中将具有以下区域：引导加载器+软设备 DAL+编译的 C++代码*用户代码</p><p>在 SAMD21 上，没有引导加载程序和软设备区域，因为引导加载程序通常不包含在.UF2 文件中，并且没有软设备。</p><p>用户代码的校验和可以包含，也可以不包含。它可以防止完全相同的用户代码重新闪烁，但这不是一个非常常见的使用场景。</p><h2 id="校验和块的位置" tabindex="-1">校验和块的位置 <a class="header-anchor" href="#校验和块的位置" aria-hidden="true">#</a></h2><p>校验和块的位置是MCU特定的。</p><ul><li>SAMD21 -（在应用向量之后，加上Arduino保留的一个单词）<code>0x20B4</code></li><li>nRF51 -（在UICR中继续）<code>0x100010C0</code> <code>CUSTOMER[16]</code></li></ul>',23),l=[i];function h(n,c,o,s,p,u){return d(),e("div",null,l)}const f=t(r,[["render",h]]);export{b as __pageData,f as default};