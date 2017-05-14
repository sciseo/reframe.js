/* global document, window */

// reframer () 🖼
// -------------
// takes 2 args:
// => target: targeted <element>
// => cname: optional custom classname
// -------------
// defines the height/width ratio of the targeted <element>
function reframer(target, cName) {
  const frame = target;
  const classname = cName || 'js-reframe';
  // makes sure reframe is not run more than 1x ✔️
  const hasClass = frame.className.split(' ').indexOf(classname) !== -1;
  if (hasClass) return;

  // general targeted <element> sizes
  const height = frame.offsetHeight;
  const width = frame.offsetWidth;
  const padding = (height / width) * 100;

  // created element <wrapper> of general reframed item
  // => set necessary styles of created element <wrapper>
  const div = document.createElement('div');
  div.className = classname;
  const divStyle = div.style;
  divStyle.position = 'relative';
  divStyle.width = '100%';
  divStyle.paddingTop = `${padding}%`;

  // set necessary styles of targeted <element>
  const frameStyle = frame.style;
  frameStyle.position = 'absolute';
  frameStyle.width = '100%';
  frameStyle.height = '100%';
  frameStyle.left = '0';
  frameStyle.top = '0';

  // reframe targeted <element>
  frame.parentNode.insertBefore(div, frame);
  frame.parentNode.removeChild(frame);
  div.appendChild(frame);
}

// plugin code 🔌
// ---------------
export default function reframe(target, cName) {
  let frames = (typeof target === 'string') ? document.querySelectorAll(target) : target;
  if (!('length' in frames)) frames = [frames];
  for (let i = 0; i < frames.length; i += 1) {
    const frame = frames[i];
    reframer(frame, cName);
  }
}

if (typeof window !== 'undefined') {
  const plugin = window.$ || window.jQuery || window.Zepto;
  if (plugin) {
    plugin.fn.reframe = function reframePlugin(cName) {
      reframe(this, cName);
    };
  }
}
