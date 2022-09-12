import {
  createEditorTransaction,
  createTiptapEditor,
  useEditorHTML,
} from 'solid-tiptap';
import StarterKit from '@tiptap/starter-kit';
import BubbleMenu from '@tiptap/extension-bubble-menu';
import Link from '@tiptap/extension-link';
import { BsTable } from 'solid-icons/bs';
import { CgRedo, CgUndo } from 'solid-icons/cg';
import {
  RiEditorDeleteColumn,
  RiEditorDeleteRow,
  RiEditorInsertColumnLeft,
  RiEditorInsertColumnRight,
  RiEditorInsertRowBottom,
  RiEditorInsertRowTop,
  RiEditorMergeCellsHorizontal,
  RiEditorSplitCellsHorizontal,
} from 'solid-icons/ri';
import {
  FaSolidBold,
  FaSolidHeading,
  FaSolidItalic,
  FaSolidLink,
  FaSolidListOl,
  FaSolidListUl,
  FaSolidQuoteLeft,
  FaSolidStrikethrough,
  FaSolidT,
} from 'solid-icons/fa';
import Table from '@tiptap/extension-table';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import { createEffect, Show } from 'solid-js';

const RichTextEditor = (props: {
  initialHTML?: string;
  onChange: (html?: string) => void;
}) => {
  let editorRef!: HTMLDivElement;
  let bubbleMenuRef!: HTMLDivElement;
  const editor = createTiptapEditor({
    get element() {
      return editorRef;
    },
    get extensions() {
      return [
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
      ];
    },
    content: props.initialHTML,
    autofocus: false,
    editorProps: {
      attributes: {
        class:
          'prose prose-blue prose-table:text-sm prose-table:shadow prose-table:ring-1 prose-table:ring-black/5 prose-td:p-3 prose-th:p-3 prose-th:bg-blue-600 prose-th:text-white max-w-none rounded-md border border-gray-300 py-2 px-3 shadow-sm outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600',
      },
    },
  });
  const html = useEditorHTML(editor);
  createEffect(() => {
    props.onChange(html());
  });
  const isActive = (name: string, attributes?: Record<string, unknown>) => {
    return createEditorTransaction(editor, (editor) =>
      editor?.isActive(name, attributes)
    )();
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
          <div>
            <button
              type="button"
              title="Lisää sarake vasemmalle"
              class={`rounded-l-md ${buttonStyle()}`}
              onClick={() => editor()?.chain().focus().addColumnBefore().run()}
            >
              <RiEditorInsertColumnLeft class="h-4 w-4" />
            </button>
            <button
              type="button"
              title="Lisää sarake oikealle"
              class={buttonStyle()}
              onClick={() => editor()?.chain().focus().addColumnAfter().run()}
            >
              <RiEditorInsertColumnRight class="h-4 w-4" />
            </button>
            <button
              type="button"
              title="Poista sarake"
              class={buttonStyle()}
              onClick={() => editor()?.chain().focus().deleteColumn().run()}
            >
              <RiEditorDeleteColumn class="h-4 w-4" />
            </button>
            <button
              type="button"
              title="Lisää rivi yläpuolelle"
              class={buttonStyle()}
              onClick={() => editor()?.chain().focus().addRowBefore().run()}
            >
              <RiEditorInsertRowTop class="h-4 w-4" />
            </button>
            <button
              type="button"
              title="Lisää rivi alapuolelle"
              class={buttonStyle()}
              onClick={() => editor()?.chain().focus().addRowAfter().run()}
            >
              <RiEditorInsertRowBottom class="h-4 w-4" />
            </button>
            <button
              type="button"
              title="Poista rivi"
              class={buttonStyle()}
              onClick={() => editor()?.chain().focus().deleteRow().run()}
            >
              <RiEditorDeleteRow class="h-4 w-4" />
            </button>
            <button
              type="button"
              title="Yhdistä solut"
              class={buttonStyle()}
              onClick={() => editor()?.chain().focus().mergeCells().run()}
            >
              <RiEditorMergeCellsHorizontal class="h-4 w-4" />
            </button>
            <button
              type="button"
              title="Jaa solu"
              class={`rounded-r-md ${buttonStyle()}`}
              onClick={() => editor()?.chain().focus().splitCell().run()}
            >
              <RiEditorSplitCellsHorizontal class="h-4 w-4" />
            </button>
          </div>
        </Show>
        <Show when={!isActive('table')}>
          <div>
            <button
              type="button"
              title="Normaali teksti"
              class={`rounded-l-md ${buttonStyle('paragraph')}`}
              onClick={() =>
                editor()?.chain().clearNodes().focus().setParagraph().run()
              }
            >
              <FaSolidT class="h-4 w-4" />
            </button>
            <button
              type="button"
              title="1. tason otsikko"
              class={buttonStyle('heading', { level: 2 })}
              onClick={() =>
                editor()
                  ?.chain()
                  .clearNodes()
                  .focus()
                  .toggleHeading({ level: 2 })
                  .run()
              }
            >
              <div class="flex items-end">
                <FaSolidHeading class="h-4 w-4" />
                <div class="font-semibold leading-none">1</div>
              </div>
            </button>
            <button
              type="button"
              title="2. tason otsikko"
              class={buttonStyle('heading', { level: 3 })}
              onClick={() =>
                editor()
                  ?.chain()
                  .clearNodes()
                  .focus()
                  .toggleHeading({ level: 3 })
                  .run()
              }
            >
              <div class="flex items-end">
                <FaSolidHeading class="h-4 w-4" />
                <div class="font-semibold leading-none">2</div>
              </div>
            </button>
            <button
              type="button"
              title="Lista"
              class={buttonStyle('bulletList')}
              onClick={() =>
                editor()?.chain().clearNodes().focus().toggleBulletList().run()
              }
            >
              <FaSolidListUl class="h-4 w-4" />
            </button>
            <button
              type="button"
              title="Numeroitu lista"
              class={buttonStyle('orderedList')}
              onClick={() =>
                editor()?.chain().clearNodes().focus().toggleOrderedList().run()
              }
            >
              <FaSolidListOl class="h-4 w-4" />
            </button>
            <button
              type="button"
              title="Lainaus"
              class={buttonStyle('blockquote')}
              onClick={() =>
                editor()?.chain().clearNodes().focus().toggleBlockquote().run()
              }
            >
              <FaSolidQuoteLeft class="h-4 w-4" />
            </button>
            <button
              type="button"
              title="Lisää taulukko"
              class={`rounded-r-md ${buttonStyle('table')}`}
              onClick={() =>
                editor()
                  ?.chain()
                  .clearNodes()
                  .focus()
                  .insertTable({ withHeaderRow: true })
                  .run()
              }
            >
              <BsTable class="h-4 w-4" />
            </button>
          </div>
        </Show>
        <div>
          <button
            type="button"
            title="Palauta"
            class={`rounded-l-md ${buttonStyle('undo')}`}
            onClick={() => editor()?.chain().focus().undo().run()}
          >
            <CgUndo class="h-4 w-4" />
          </button>
          <button
            type="button"
            title="Tee uudelleen"
            class={`rounded-r-md ${buttonStyle('redo')}`}
            onClick={() => editor()?.chain().focus().redo().run()}
          >
            <CgRedo class="h-4 w-4" />
          </button>
        </div>
      </div>
      <div id="bubbleMenu" ref={bubbleMenuRef}>
        <button
          type="button"
          title="Lihavoitu teksti"
          class={`rounded-l-md ${buttonStyle('bold')}`}
          onClick={() => editor()?.chain().focus().toggleBold().run()}
        >
          <FaSolidBold class="h-4 w-4" />
        </button>
        <button
          type="button"
          title="Kursivoitu teksti"
          class={buttonStyle('italic')}
          onClick={() => editor()?.chain().focus().toggleItalic().run()}
        >
          <FaSolidItalic class="h-4 w-4" />
        </button>
        <button
          type="button"
          title="Yliviivattu teksti"
          class={buttonStyle('strike')}
          onClick={() => editor()?.chain().focus().toggleStrike().run()}
        >
          <FaSolidStrikethrough class="h-4 w-4" />
        </button>
        <button
          type="button"
          title="Lisää linkki"
          class={`rounded-r-md ${buttonStyle('link')}`}
          onClick={() =>
            editor()
              ?.chain()
              .focus()
              .toggleLink({ href: prompt('Syötä linkki:') ?? '' })
              .run()
          }
        >
          <FaSolidLink class="h-4 w-4" />
        </button>
      </div>
      <div id="editor" ref={editorRef} />
    </div>
  );
};

export default RichTextEditor;
