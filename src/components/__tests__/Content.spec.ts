import createFetchMock from 'vitest-fetch-mock';
import { describe, test, beforeEach, expect, vi } from "vitest";
import 'vitest-fetch-mock';

const fetchMock = createFetchMock(vi);
fetchMock.enableMocks();


import { shallowMount, mount } from "@vue/test-utils";
import Content from "../Content.vue";


describe('Pruebas en <Content/>', () => {
    let wrapper = shallowMount(Content);
    let spyConsole = vi.spyOn( console, 'log' );
    // global.fetch = vi.fn( (): any => Promise.resolve({
    //     json: () => Promise.resolve<Answer>({
    //         answer: 'yes',
    //         forced: false,
    //         image: 'https://yesno.wtf/assets/yes/2.gif'
    //     })
    // }));
    beforeEach( () => {
        wrapper = shallowMount(Content);
        spyConsole = vi.spyOn( console, 'log' );
        vi.clearAllMocks();
        fetchMock.doMock();
    });
    test('Debe de hacer match con el snapshot', () => {
        expect(wrapper.html()).toMatchSnapshot();
    });
    test('Escribir en el input no debe de disparar nada, solo el console.log', async () => {
        const spy = vi.spyOn(wrapper.vm.handle, 'getResult');
        const input = wrapper.find('input');
        //Cuando de modifica el DOM se debe poner un await y una funcion async.
        await input.setValue('Hola mundo');
        expect( spyConsole ).toHaveBeenCalledTimes(2);
        expect(spy).toHaveBeenCalledTimes(0);
    });
    test('Disparar el getResult al escribir el simbolo ?', async () => {
        const spy = vi.spyOn(wrapper.vm.handle, 'getResult');
        const input = wrapper.find('input');
        await input.setValue('Hola Mundo?');
        expect( spyConsole ).toHaveBeenCalledTimes(3);
        expect(spy).toHaveBeenCalled();
    });
    test('Pruebas en getAnswer', async () => {
        await wrapper.vm.handle.getResult();
        const { answer, forced, image } = wrapper.vm.handle.result.value;
        const yesno = answer == 'yes' ? 'Si' : 'No';

        const img = wrapper.find('img');
        const h2 = wrapper.find('h2');

        expect( img.attributes('src') ).toBe( image );
        expect( h2.text() ).toBe( yesno );
        
    });
    test('Pruebas en getAnswer - fallo en el Api', async () => {

        fetchMock.mockImplementationOnce( () => Promise.reject('API Error') );

        await wrapper.vm.handle.getResult();

        const { answer, forced, image } = wrapper.vm.handle.result.value;

        expect( answer ).toBe( 'Fallo la conexion al API' );
        expect( image ).toBe( '' );
    });
});


export{}