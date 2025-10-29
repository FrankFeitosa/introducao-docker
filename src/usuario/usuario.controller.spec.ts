import { Test, TestingModule } from "@nestjs/testing";
import { UsuarioController } from "./usuario.controller";
import { UsuarioService } from "./usuario.service";

const mockUsuarioService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
};

describe('UsuarioController', () => {
    let usuarioController: UsuarioController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UsuarioController],
            providers: [
                { provide: UsuarioService, useValue: mockUsuarioService },
            ],
        }).compile();
        usuarioController = module.get<UsuarioController>(UsuarioController);
    });

    it('deve listar todos os usuários', async () => {
        const usuarios = [
            { id: '1', nome: 'Teste', email: 'test@mail.com', senha: 'senha123' },
            { id: '2', nome: 'Teste2', email: 'test2@mail.com', senha: 'senha123' },
            { id: '3', nome: 'Teste3', email: 'test3@mail.com', senha: 'senha123' },
        ];
        mockUsuarioService.findAll.mockResolvedValue(usuarios);

        expect(await usuarioController.findAll()).toEqual(usuarios);
    });

    it('deve listar usuários por ID', async () => {
        const usuarios = [
            { id: '1', nome: 'Teste', email: 'test@mail.com', senha: 'senha123' },
            { id: '2', nome: 'Teste2', email: 'test2@mail.com', senha: 'senha123' },
            { id: '3', nome: 'Teste3', email: 'test3@mail.com', senha: 'senha123' },
        ];
        mockUsuarioService.findOne.mockResolvedValue(usuarios);

        expect(await usuarioController.findOne(usuarios[0].id)).toEqual(usuarios);
    });

    it('deve atualizar um usuário', async () => {
        const updatedUser = { id: '1', nome: 'Teste Atualizado', email: 'testupdate@mail.com', senha: 'senha123' };
        const update = { ...updatedUser, id: '1' };
        mockUsuarioService.update.mockResolvedValue(updatedUser);

        expect(await usuarioController.update('1', update)).toEqual(updatedUser);
    });

    it('deve remover um usuário', async () => {
        const removedUser = [
            { id: '1', nome: 'Teste', email: 'test@mail.com', senha: 'senha123' },
            { id: '2', nome: 'Teste2', email: 'test2@mail.com', senha: 'senha123' },
            { id: '3', nome: 'Teste3', email: 'test3@mail.com', senha: 'senha123' },
        ]

        mockUsuarioService.remove.mockResolvedValue(removedUser);

        expect(await usuarioController.remove(removedUser[1].id)).toEqual(removedUser);
    });

});

