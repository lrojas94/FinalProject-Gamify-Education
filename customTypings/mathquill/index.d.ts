declare namespace MathQuill {
  interface MathQuill {
    noConflict(): MathQuill;
    getInterface(n: number): MQ ;
  }

  interface MQ {
    StaticMath(object: any): StaticMathField;
    MathField(object: any, config?: MathQuillConfig): EditableMathField;
  }

  interface StaticMathField {
    revert(): any;
    reflow(): any;
    el(): any;
    latex(): any;
    latex(latexString: string): any;
  }

  interface MathQuillConfig {
    spaceBehavesLikeTab: boolean;
    leftRightIntoCmdGoes: string;
    restrictMismatchedBrackets: boolean;
    sumStartsWithNEquals: boolean;
    supSubsRequireOperand: boolean;
    charsThatBreakOutOfSupSub: string;
    autoSubscriptNumerals: boolean;
    autoCommands: string;
    autoOperatorNames: string;
    substituteTextarea: Function;
    handlers: {
      edit: Function;
      upOutOf: Function;
      moveOutOf: Function;
    };
  }

  interface EditableMathField extends StaticMathField {
    focus(): void;
    blur(): void;
    write(latexString: string): void;
    cmd(latexString: string): void;
    select(): void;
    clearSelection(): void;
    moveToEndLeft(): void;
    moveToEndRight(): void;
    keystroke(keys: string): void;
    typedText(text: string): void;
    config(config: MathQuillConfig): void;
  }
}

declare var MathQuill: MathQuill.MathQuill;

declare module 'mathquill' {
  export = MathQuill;
}
