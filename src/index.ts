#!/usr/bin/env node
import { init } from './init';
import { generate } from './generate';

init().then((resp) => {
    generate(resp);
});
