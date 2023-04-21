import { logger } from "@laitjy/axiom";
import { uploadImageToStorage } from "@laitjy/supabase";
import type { Editor } from "@tiptap/core";
import { BsTable } from "solid-icons/bs";
import {
  FaRegularImage,
  FaSolidHeading,
  FaSolidListOl,
  FaSolidListUl,
  FaSolidQuoteRight,
  FaSolidT,
} from "solid-icons/fa";

type InputChangeHandler = (
  event: Event & { currentTarget: HTMLInputElement }
) => Promise<void>;

const NodeMenu = (props: {
  editor?: Editor;
  buttonStyle: (name?: string, attributes?: Record<string, unknown>) => string;
}) => {
  const handleImageChange: InputChangeHandler = async (event) => {
    try {
      const file = event.currentTarget.files?.[0];
      if (!file) return;
      const src = await uploadImageToStorage(file);
      props.editor?.chain().clearNodes().focus().setImage({ src }).run();
    } catch (error) {
      await logger.error(error as Error);
      alert("Kuvan lataus ei onnistunut. Yritä uudelleen!");
    }
  };
  return (
    <>
      <div class="flex">
        <button
          type="button"
          title="Normaali teksti"
          class={`rounded-l-md ${props.buttonStyle("paragraph")}`}
          onClick={() =>
            props.editor?.chain().clearNodes().focus().setParagraph().run()
          }
        >
          <FaSolidT class="h-4 w-4" />
        </button>
        <button
          type="button"
          title="1. tason otsikko"
          class={props.buttonStyle("heading", { level: 2 })}
          onClick={() =>
            props.editor
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
          class={props.buttonStyle("heading", { level: 3 })}
          onClick={() =>
            props.editor
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
          class={props.buttonStyle("bulletList")}
          onClick={() =>
            props.editor?.chain().clearNodes().focus().toggleBulletList().run()
          }
        >
          <FaSolidListUl class="h-4 w-4" />
        </button>
        <button
          type="button"
          title="Numeroitu lista"
          class={props.buttonStyle("orderedList")}
          onClick={() =>
            props.editor?.chain().clearNodes().focus().toggleOrderedList().run()
          }
        >
          <FaSolidListOl class="h-4 w-4" />
        </button>
        <button
          type="button"
          title="Lainaus"
          class={props.buttonStyle("blockquote")}
          onClick={() =>
            props.editor?.chain().clearNodes().focus().toggleBlockquote().run()
          }
        >
          <FaSolidQuoteRight class="h-4 w-4" />
        </button>
        <div class={`cursor-pointer ${props.buttonStyle("image")}`}>
          <label for="richTextImageButton">
            <FaRegularImage class="h-4 w-4" />
          </label>
          <input
            class="hidden w-0"
            id="richTextImageButton"
            type="file"
            onChange={handleImageChange}
          />
        </div>
        <button
          type="button"
          title="Lisää taulukko"
          class={`rounded-r-md ${props.buttonStyle("table")}`}
          onClick={() =>
            props.editor
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
    </>
  );
};

export default NodeMenu;
