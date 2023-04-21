import type { Editor } from "@tiptap/core";
import { CgRedo, CgUndo } from "solid-icons/cg";

const HistoryMenu = (props: {
  editor?: Editor;
  buttonStyle: (name?: string, attributes?: Record<string, unknown>) => string;
}) => {
  return (
    <div>
      <button
        type="button"
        title="Palauta"
        class={`rounded-l-md ${props.buttonStyle("undo")}`}
        onClick={() => props.editor?.chain().focus().undo().run()}
      >
        <CgUndo class="h-4 w-4" />
      </button>
      <button
        type="button"
        title="Tee uudelleen"
        class={`rounded-r-md ${props.buttonStyle("redo")}`}
        onClick={() => props.editor?.chain().focus().redo().run()}
      >
        <CgRedo class="h-4 w-4" />
      </button>
    </div>
  );
};

export default HistoryMenu;
