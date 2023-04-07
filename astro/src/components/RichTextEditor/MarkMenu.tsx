import type { Editor } from "@tiptap/core";
import {
  FaSolidBold,
  FaSolidItalic,
  FaSolidLink,
  FaSolidStrikethrough,
} from "solid-icons/fa";

const MarkMenu = (props: {
  editor?: Editor;
  buttonStyle: (name?: string, attributes?: Record<string, unknown>) => string;
}) => {
  return (
    <div>
      <button
        type="button"
        title="Lihavoitu teksti"
        class={`rounded-l-md ${props.buttonStyle("bold")}`}
        onClick={() => props.editor?.chain().focus().toggleBold().run()}
      >
        <FaSolidBold class="h-4 w-4" />
      </button>
      <button
        type="button"
        title="Kursivoitu teksti"
        class={props.buttonStyle("italic")}
        onClick={() => props.editor?.chain().focus().toggleItalic().run()}
      >
        <FaSolidItalic class="h-4 w-4" />
      </button>
      <button
        type="button"
        title="Yliviivattu teksti"
        class={props.buttonStyle("strike")}
        onClick={() => props.editor?.chain().focus().toggleStrike().run()}
      >
        <FaSolidStrikethrough class="h-4 w-4" />
      </button>
      <button
        type="button"
        title="Lisää linkki"
        class={`rounded-r-md ${props.buttonStyle("link")}`}
        onClick={() =>
          props.editor
            ?.chain()
            .focus()
            .toggleLink({ href: prompt("Syötä linkki:") ?? "" })
            .run()
        }
      >
        <FaSolidLink class="h-4 w-4" />
      </button>
    </div>
  );
};

export default MarkMenu;
