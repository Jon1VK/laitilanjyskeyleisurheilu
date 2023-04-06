import { Editor } from '@tiptap/core';
import BubbleMenu from '@tiptap/extension-bubble-menu';
import FloatingMenu from '@tiptap/extension-floating-menu';
import Link from '@tiptap/extension-link';
import Table from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import StarterKit from '@tiptap/starter-kit';
import { createEffect, createSignal, onCleanup } from 'solid-js';
import HistoryMenu from './HistoryMenu';
import Image from './Image';
import MarkMenu from './MarkMenu';
import NodeMenu from './NodeMenu';
import TableMenu from './TableMenu';

const RichTextEditor = (props: {
  initialHTML?: string;
  onChange: (html?: string) => void;
}) => {
  let editorRef!: HTMLDivElement;
  let floatingMenuRef!: HTMLDivElement;
  let bubbleMenuRef!: HTMLDivElement;
  let tableMenuRef!: HTMLDivElement;
  const [editor, setEditor] = createSignal<Editor>();
  createEffect(() => {
    setEditor(
      new Editor({
        element: editorRef,
        content: props.initialHTML,
        autofocus: false,
        extensions: [
          FloatingMenu.configure({ element: floatingMenuRef }),
          BubbleMenu.configure({
            element: bubbleMenuRef,
            pluginKey: 'bubbleMenu',
          }),
          BubbleMenu.configure({
            element: tableMenuRef,
            pluginKey: 'tableMenu',
            shouldShow: ({ editor, state }) => {
              return editor.isActive('table') && state.selection.empty;
            },
          }),
          StarterKit.configure({
            heading: { levels: [2, 3] },
            codeBlock: false,
            code: false,
          }),
          Link.configure({ protocols: ['mailto'] }),
          Table,
          TableHeader,
          TableRow,
          TableCell,
          Image,
        ],
        editorProps: {
          attributes: {
            class:
              'prose prose-blue prose-table:text-sm prose-table:shadow prose-table:ring-1 prose-table:ring-black/5 prose-td:p-3 prose-th:p-3 prose-th:bg-blue-600 prose-th:text-white max-w-none rounded-md border border-gray-300 py-2 px-3 shadow-sm outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600',
          },
        },
      })
    );
  });
  const [updateSignal, setUpdateSignal] = createSignal([]);
  createEffect(() => {
    const forceUpdate = () => setUpdateSignal([]);
    editor()?.on('transaction', forceUpdate);
    onCleanup(() => editor()?.off('transaction', forceUpdate));
  });
  createEffect(() => {
    updateSignal();
    props.onChange(editor()?.getHTML());
  });
  const isActive = (name: string, attributes?: Record<string, unknown>) => {
    updateSignal();
    return editor()?.isActive(name, attributes);
  };
  const buttonStyle = (
    name = 'default',
    attributes?: Record<string, unknown>
  ) =>
    `border border-gray-300 p-2 hover:bg-gray-200 ${
      isActive(name, attributes) ? 'bg-gray-200' : 'bg-gray-50'
    }`;
  return (
    <div>
      <div id="historyMenu">
        <HistoryMenu editor={editor()} buttonStyle={buttonStyle} />
      </div>
      <div id="floatingMenu" ref={floatingMenuRef}>
        <NodeMenu editor={editor()} buttonStyle={buttonStyle} />
      </div>
      <div id="bubbleMenu" ref={bubbleMenuRef}>
        <MarkMenu editor={editor()} buttonStyle={buttonStyle} />
      </div>
      <div id="tableMenu" ref={tableMenuRef}>
        <TableMenu editor={editor()} buttonStyle={buttonStyle} />
      </div>
      <div id="editor" ref={editorRef} />
    </div>
  );
};

export default RichTextEditor;
