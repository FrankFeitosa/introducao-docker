import { Test, TestingModule } from "@nestjs/testing";
import { UsuarioService } from "./usuario.service";
import { PrismaService } from "../prisma/prisma.service";

const mockPrisma = {
    usuario: {
        findMany: jest.fn(),
        findUnique: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
    },
};

describe('UsuarioService', () => {
    let service: UsuarioService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UsuarioService,
                { provide: PrismaService, useValue: mockPrisma },
            ],
        }).compile();

        service = module.get<UsuarioService>(UsuarioService);
    });

    it('deve listar todos os usuários', async () => {
        const usuarios = [
            { id: '1', nome: 'Teste', email: 'test@mail.com', senha: 'senha123' },
            { id: '2', nome: 'Teste2', email: 'test2@mail.com', senha: 'senha123' },
            { id: '3', nome: 'Teste3', email: 'test3@mail.com', senha: 'senha123' },
        ];
        mockPrisma.usuario.findMany.mockResolvedValue(usuarios);

        const result = await service.findAll();
        expect(result).toEqual(usuarios);
    });

    it('deve listar usuários por ID', async () => {
        const usuarios = [
            { id: '1', nome: 'Teste', email: 'test@mail.com', senha: 'senha123' },
            { id: '2', nome: 'Teste2', email: 'test2@mail.com', senha: 'senha123' },
            { id: '3', nome: 'Teste3', email: 'test3@mail.com', senha: 'senha123' },
        ];
        mockPrisma.usuario.findUnique.mockResolvedValue(usuarios);

        const result = await service.findOne('1');
        expect(result).toEqual(usuarios);
    });

    it('deve atualizar um usuário', async () => {
        const updatedUser = { id: '1', nome: 'Teste Atualizado', email: 'testatualizado@mail.com', senha: 'senha123' };
        mockPrisma.usuario.findUnique.mockResolvedValue(updatedUser);
        mockPrisma.usuario.update.mockResolvedValue(updatedUser);

        const result = await service.update('1', { nome: 'Teste Atualizado', email: 'testatualizado@mail.com', senha: 'senha123' });
        expect(result).toEqual(updatedUser);
        expect(mockPrisma.usuario.update).toHaveBeenCalledWith({
            where: { id: '1' },
            data: { nome: 'Teste Atualizado', email: 'testatualizado@mail.com', senha: 'senha123' },
        });
    })

    it('deve remover um usuário', async () => {
        const removedUser = { id: '1', nome: 'Teste Atualizado', email: 'testatualizado@mail.com', senha: 'senha123' };
        mockPrisma.usuario.findUnique.mockResolvedValue(removedUser);
        mockPrisma.usuario.delete.mockResolvedValue(removedUser);

        const result = await service.remove(removedUser.id);
        expect(result).toEqual(removedUser);
        expect(mockPrisma.usuario.delete).toHaveBeenCalledWith({
            where: { id: '1'},
        });
    });

});