import type { SingleCommands } from "@tiptap/core";
import { mergeAttributes, Node } from "@tiptap/core";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    image: {
      setImage: (options: { src: string }) => ReturnType;
    };
  }
}

const Image = Node.create({
  name: "image",
  group: "block",
  content: "inline*",
  draggable: true,
  isolating: true,

  addAttributes() {
    return {
      src: {
        default: null,
        parseHTML: (element) =>
          element.querySelector("img")?.getAttribute("src"),
      },
    };
  },

  parseHTML() {
    return [{ tag: "figure", contentElement: "figcaption" }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "figure",
      [
        "img",
        mergeAttributes(HTMLAttributes, {
          class: "w-full rounded-lg",
          draggable: false,
          contentEditable: false,
        }),
      ],
      ["figcaption", 0],
    ];
  },

  addCommands() {
    return {
      setImage:
        (options) =>
        ({ commands }: { commands: SingleCommands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: options,
          });
        },
    };
  },
});

export default Image;
