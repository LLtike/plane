import { JSONContent } from "@tiptap/core";
// helpers
import { IMarking } from "@/helpers/scroll-to-node";
// types
import {
  IMentionHighlight,
  IMentionSuggestion,
  TAIHandler,
  TColorEditorCommands,
  TDisplayConfig,
  TEmbedConfig,
  TExtensions,
  TFileHandler,
  TNonColorEditorCommands,
  TServerHandler,
} from "@/types";
// editor refs
export type EditorReadOnlyRefApi = {
  getMarkDown: () => string;
  getDocument: () => {
    binary: Uint8Array | null;
    html: string;
    json: JSONContent | null;
  };
  clearEditor: (emitUpdate?: boolean) => void;
  setEditorValue: (content: string) => void;
  scrollSummary: (marking: IMarking) => void;
  getDocumentInfo: () => {
    characters: number;
    paragraphs: number;
    words: number;
  };
  onHeadingChange: (callback: (headings: IMarking[]) => void) => () => void;
  getHeadings: () => IMarking[];
};

export interface EditorRefApi extends EditorReadOnlyRefApi {
  blur: () => void;
  scrollToNodeViaDOMCoordinates: (behavior?: ScrollBehavior, position?: number) => void;
  getCurrentCursorPosition: () => number | undefined;
  setEditorValueAtCursorPosition: (content: string) => void;
  executeMenuItemCommand: (
    props:
      | {
          itemKey: TNonColorEditorCommands;
        }
      | {
          itemKey: TColorEditorCommands;
          color: string | undefined;
        }
  ) => void;
  isMenuItemActive: (
    props:
      | {
          itemKey: TNonColorEditorCommands;
        }
      | {
          itemKey: TColorEditorCommands;
          color: string | undefined;
        }
  ) => boolean;
  onStateChange: (callback: () => void) => () => void;
  setFocusAtPosition: (position: number) => void;
  isEditorReadyToDiscard: () => boolean;
  getSelectedText: () => string | null;
  insertText: (contentHTML: string, insertOnNextLine?: boolean) => void;
  setProviderDocument: (value: Uint8Array) => void;
}

// editor props
export interface IEditorProps {
  containerClassName?: string;
  displayConfig?: TDisplayConfig;
  disabledExtensions?: TExtensions[];
  editorClassName?: string;
  fileHandler: TFileHandler;
  forwardedRef?: React.MutableRefObject<EditorRefApi | null>;
  id: string;
  initialValue: string;
  mentionHandler: {
    highlights: () => Promise<IMentionHighlight[]>;
    suggestions?: () => Promise<IMentionSuggestion[]>;
  };
  onChange?: (json: object, html: string) => void;
  onTransaction?: () => void;
  handleEditorReady?: (value: boolean) => void;
  autofocus?: boolean;
  onEnterKeyPress?: (e?: any) => void;
  placeholder?: string | ((isFocused: boolean, value: string) => string);
  tabIndex?: number;
  value?: string | null; 
}
export interface ILiteTextEditor extends IEditorProps {
  extensions?: any[];
}
export interface IRichTextEditor extends IEditorProps {
  extensions?: any[];
  bubbleMenuEnabled?: boolean;
  dragDropEnabled?: boolean;
}

export interface ICollaborativeDocumentEditor
  extends Omit<IEditorProps, "initialValue" | "onChange" | "onEnterKeyPress" | "value"> {
  aiHandler?: TAIHandler;
  embedHandler: TEmbedConfig;
  handleEditorReady?: (value: boolean) => void;
  id: string;
  realtimeConfig: TRealtimeConfig;
  serverHandler?: TServerHandler;
  user: TUserDetails;
}

// read only editor props
export interface IReadOnlyEditorProps {
  containerClassName?: string;
  displayConfig?: TDisplayConfig;
  editorClassName?: string;
  fileHandler: Pick<TFileHandler, "getAssetSrc">;
  forwardedRef?: React.MutableRefObject<EditorReadOnlyRefApi | null>;
  id: string;
  initialValue: string;
  mentionHandler: {
    highlights: () => Promise<IMentionHighlight[]>;
  };
}

export type ILiteTextReadOnlyEditor = IReadOnlyEditorProps;

export type IRichTextReadOnlyEditor = IReadOnlyEditorProps;

export interface ICollaborativeDocumentReadOnlyEditor extends Omit<IReadOnlyEditorProps, "initialValue"> {
  embedHandler: TEmbedConfig;
  handleEditorReady?: (value: boolean) => void;
  id: string;
  realtimeConfig: TRealtimeConfig;
  serverHandler?: TServerHandler;
  user: TUserDetails;
}

export interface IDocumentReadOnlyEditor extends IReadOnlyEditorProps {
  embedHandler: TEmbedConfig;
  handleEditorReady?: (value: boolean) => void;
}

export type TUserDetails = {
  color: string;
  id: string;
  name: string;
  cookie?: string;
};

export type TRealtimeConfig = {
  url: string;
  queryParams: {
    [key: string]: string;
  };
};
