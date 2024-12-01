import { clientAppReducer, clientInitialState } from '../client';
import { ClientAppActions } from '@/app/domain/types/app-client';
import { Client } from '@/app/domain/interfaces/client';

describe('clientAppReducer', () => {
    const mockClients: Client[] = [
        {
            id: "unique-id 1",
            names: 'Alice',
            lastnames: 'Smith',
            email: 'alice.smith@example.com',
            district: 'Downtown',
            address: '123 Elm St',
            reference: 'Near the park',
            phone: '555-0101',
            password: 'password1',
            products: [{
                id: 101,
                title: 'Laptop',
                quantity: 1,
                price: 1000,
                total: 1000,
            }],
        },
        {
            id: "unique-id 2",
            names: 'Bob',
            lastnames: 'Johnson',
            email: 'bob.johnson@example.com',
            district: 'Uptown',
            address: '456 Oak Ave',
            reference: 'Next to the library',
            phone: '555-0202',
            password: 'password2',
            products: [{
                id: 102,
                title: 'Smartphone',
                quantity: 1,
                price: 500,
                total: 500,
            }],
        }
    ];

    it('should handle ClientSave action and add a new client', () => {
        const newClient: Client = {
            ...mockClients[0] 
        };
    
        const action = {
            type: ClientAppActions.ClientSave,
            payload: newClient,
        };
    
        const stateAfterSave = clientAppReducer(clientInitialState, action);
    
        expect(stateAfterSave.clients).toContainEqual(newClient);
        expect(stateAfterSave.clients.length).toBe(1); 
    });

    it('should handle ClientDelete action and remove selected clients', () => {
        const action = {
            type: ClientAppActions.ClientDelete,
            payload: [mockClients[0]], 
        };
    
        const stateAfterDelete = clientAppReducer({ ...clientInitialState, clients: mockClients }, action);
    
        expect(stateAfterDelete.clients).toHaveLength(1);
    });

    it('should handle ClientSelect action and select a client', () => {
        const action = {
            type: ClientAppActions.ClientSelect,
            payload: mockClients[0], 
        };

        const stateAfterSelect = clientAppReducer(clientInitialState, action);

        expect(stateAfterSelect.clientSelected).toEqual(mockClients[0]);
    });

    it('should throw error for unknown action type', () => {
        const action = { type: 'UNKNOWN_ACTION' as any };

        expect(() => { clientAppReducer(clientInitialState, action); }).toThrowError('Unhandled action type: UNKNOWN_ACTION');
    });
});
