import "styled-components"
/*
styled-components는 JS 기반 라이브러리다.
이 선언 파일에서는 ts로 정의된 DefaultTheme interface를 정의한다
*/
declare module "styled-components"{
    export interface DefaultTheme {
        textColor: string;
        bgColor: string;
        accentColor: string;
        cardBgColor: string;
    }
}