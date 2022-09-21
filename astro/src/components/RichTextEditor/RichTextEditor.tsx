import { Editor } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import BubbleMenu from '@tiptap/extension-bubble-menu';
import Link from '@tiptap/extension-link';
import Table from '@tiptap/extension-table';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import { createEffect, createSignal, onCleanup, Show } from 'solid-js';
import Image from './Image';
import TableMenu from './TableMenu';
import NodeMenu from './NodeMenu';
import HistoryMenu from './HistoryMenu';
import MarkMenu from './MarkMenu';

const RichTextEditor = (props: {
  initialHTML?: string;
  onChange: (html?: string) => void;
}) => {
  let editorRef!: HTMLDivElement;
  let bubbleMenuRef!: HTMLDivElement;
  const [editor, setEditor] = createSignal<Editor>();
  createEffect(() => {
    setEditor(
      new Editor({
        element: editorRef,
        content: props.initialHTML,
        autofocus: false,
        extensions: [
          BubbleMenu.configure({ element: bubbleMenuRef }),
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
      <div class="flex justify-between">
        <Show when={isActive('table')}>
          <TableMenu editor={editor()} buttonStyle={buttonStyle} />
        </Show>
        <Show when={!isActive('table')}>
          <NodeMenu editor={editor()} buttonStyle={buttonStyle} />
        </Show>
        <HistoryMenu editor={editor()} buttonStyle={buttonStyle} />
      </div>
      <div id="bubbleMenu" ref={bubbleMenuRef}>
        <MarkMenu editor={editor()} buttonStyle={buttonStyle} />
      </div>
      <div id="editor" ref={editorRef} />
    </div>
  );
};

export default RichTextEditor;
