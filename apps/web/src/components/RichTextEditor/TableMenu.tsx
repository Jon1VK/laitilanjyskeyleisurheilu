import type { Editor } from "@tiptap/core";
import { AiOutlineInsertRowAbove } from "solid-icons/ai";
import { HiOutlineTrash } from "solid-icons/hi";
import {
  RiEditorDeleteColumn,
  RiEditorDeleteRow,
  RiEditorInsertColumnLeft,
  RiEditorInsertColumnRight,
  RiEditorInsertRowBottom,
  RiEditorInsertRowTop,
  RiEditorMergeCellsHorizontal,
  RiEditorSplitCellsHorizontal,
} from "solid-icons/ri";

const TableMenu = (props: {
  editor?: Editor;
  buttonStyle: (name?: string, attributes?: Record<string, unknown>) => string;
}) => {
  return (
    <div>
      <button
        type="button"
        title="Lisää/poista otsikkorivi"
        class={`rounded-l-md ${props.buttonStyle()}`}
        onClick={() => props.editor?.chain().focus().toggleHeaderRow().run()}
      >
        <AiOutlineInsertRowAbove class="h-4 w-4" />
      </button>
      <button
        type="button"
        title="Lisää sarake vasemmalle"
        class={props.buttonStyle()}
        onClick={() => props.editor?.chain().focus().addColumnBefore().run()}
      >
        <RiEditorInsertColumnLeft class="h-4 w-4" />
      </button>
      <button
        type="button"
        title="Lisää sarake oikealle"
        class={props.buttonStyle()}
        onClick={() => props.editor?.chain().focus().addColumnAfter().run()}
      >
        <RiEditorInsertColumnRight class="h-4 w-4" />
      </button>
      <button
        type="button"
        title="Poista sarake"
        class={props.buttonStyle()}
        onClick={() => props.editor?.chain().focus().deleteColumn().run()}
      >
        <RiEditorDeleteColumn class="h-4 w-4" />
      </button>
      <button
        type="button"
        title="Lisää rivi yläpuolelle"
        class={props.buttonStyle()}
        onClick={() => props.editor?.chain().focus().addRowBefore().run()}
      >
        <RiEditorInsertRowTop class="h-4 w-4" />
      </button>
      <button
        type="button"
        title="Lisää rivi alapuolelle"
        class={props.buttonStyle()}
        onClick={() => props.editor?.chain().focus().addRowAfter().run()}
      >
        <RiEditorInsertRowBottom class="h-4 w-4" />
      </button>
      <button
        type="button"
        title="Poista rivi"
        class={props.buttonStyle()}
        onClick={() => props.editor?.chain().focus().deleteRow().run()}
      >
        <RiEditorDeleteRow class="h-4 w-4" />
      </button>
      <button
        type="button"
        title="Yhdistä solut"
        class={props.buttonStyle()}
        onClick={() => props.editor?.chain().focus().mergeCells().run()}
      >
        <RiEditorMergeCellsHorizontal class="h-4 w-4" />
      </button>
      <button
        type="button"
        title="Jaa solu"
        class={props.buttonStyle()}
        onClick={() => props.editor?.chain().focus().splitCell().run()}
      >
        <RiEditorSplitCellsHorizontal class="h-4 w-4" />
      </button>
      <button
        type="button"
        title="Poista taulukko"
        class={`relative rounded-r-md ${props.buttonStyle()}`}
        onClick={() => props.editor?.chain().focus().deleteTable().run()}
      >
        <HiOutlineTrash class="h-4 w-4" />
      </button>
    </div>
  );
};

export default TableMenu;
