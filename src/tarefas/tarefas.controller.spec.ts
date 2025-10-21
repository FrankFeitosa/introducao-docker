import { Test, TestingModule } from "@nestjs/testing";
import { TarefasController } from "./tarefas.controller";
import { TarefasService } from "./tarefas.service";

const mockTarefaService = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
};

describe('TarefasController', () => {
  let controller: TarefasController;
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [TarefasController],
            providers: [
                { provide: TarefasService, useValue: mockTarefaService },
            ],
        }).compile();  
        controller = module.get<TarefasController>(TarefasController); 
    });

    it('deve criar uma nova tarefa', async () => {
        const novaTarefa = {
            nome_tarefa: 'Nova Tarefa',
            responsavel: 'Fulano',
            data_entrega: '01/11/2025',
            objetivo: 'Objetivo de teste'
        };
        const tarefaCriada = { id: '1', ...novaTarefa };
        mockTarefaService.create.mockResolvedValue(tarefaCriada);
        expect(await controller.create(novaTarefa as any)).toBe(tarefaCriada);
    });

    it('deve listar todas as tarefas', async () => {
        const tarefas = [{ id: '1', titulo: 'Tarefa 1', descricao: 'Descrição 1' }];
        mockTarefaService.findAll.mockResolvedValue(tarefas);
        expect(await controller.findAll()).toBe(tarefas);
    });

    it('deve encontrar uma tarefa por ID', async () => {
        const tarefa = { id: '1', titulo: 'Tarefa 1', descricao: 'Descrição 1' };
        mockTarefaService.findOne.mockResolvedValue(tarefa);
        expect(await controller.findOne('1')).toBe(tarefa);
    });

    it('deve atualizar uma tarefa existente', async () => {
        const tarefaAtualizada = { id: '1', titulo: 'Tarefa Atualizada', descricao: 'Descrição Atualizada' };
        mockTarefaService.update.mockResolvedValue(tarefaAtualizada);
        expect(await controller.update('1', { titulo: 'Tarefa Atualizada', descricao: 'Descrição Atualizada' } as any)).toBe(tarefaAtualizada);
    });

    it('deve remover uma tarefa por ID', async () => {
        mockTarefaService.remove.mockResolvedValue(undefined);
        expect(await controller.remove('1')).toBeUndefined();
    });

});