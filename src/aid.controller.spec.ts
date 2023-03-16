import { Test, TestingModule } from '@nestjs/testing';
import { HumanitarianAidController } from './aid.controller';
import { HumanitarianAidService } from './aid.service';

describe('HumanitarianAidController', () => {
    let controller: HumanitarianAidController;
    let service: HumanitarianAidService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [HumanitarianAidController],
            providers: [HumanitarianAidService],
        }).compile();

        controller = module.get<HumanitarianAidController>(HumanitarianAidController);
        service = module.get<HumanitarianAidService>(HumanitarianAidService);
    });

    describe('getAidData', () => {
        it('Debería retornar los datos de ayuda humanitaria para el país y año especificados', async () => {
            const aidData = {
                2020: {
                    'verification of expenditure declared in financial reports under contract EIDHR/2015/366-650': 15867,
                },
                2021: {
                    'OVOF - Movement Building-Sudan': 1794,
                    'OVOF - Use of Arts, Media and Culture-Sudan': 1597,
                    'OVOF - Strategic Use of Technology-Sudan': 341,
                },
            };

            jest.spyOn(service, 'getAidData').mockResolvedValue(aidData);

            const result = await controller.getAidData('SD', '2021');

            expect(result).toEqual(aidData);
        });

        it('Debería devolver un error 404 si los datos no se encuentran para el país y año especificados', async () => {
            jest.spyOn(service, 'getAidData').mockResolvedValue(null);

            try {
                await controller.getAidData('ZZ', '2020');
            } catch (error) {
                expect(error.status).toBe(404);
                expect(error.message).toBe('Data not found for the specified country and year');
            }
        });
    });
});
