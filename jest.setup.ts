import '@testing-library/jest-dom';
//import '@testing-library/user-event';

import { TextDecoder, TextEncoder } from "util";

global.TextDecoder = TextDecoder as any;

global.TextEncoder = TextEncoder;
