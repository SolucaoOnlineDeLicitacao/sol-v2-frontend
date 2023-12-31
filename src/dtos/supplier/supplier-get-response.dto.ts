import { AddressDto } from "../shared/address.dto";
import { LegalRepresentativeDto } from "../shared/legal.representative.dto";
import { SuplierTypeEnum } from "./supplier-type.enum";

export class SupplierGetResponseDto {
    _id: string;
    name: string;
    cpf: string;
    type: string;
    address: AddressDto;
    legal_representative: LegalRepresentativeDto;
    group_id: string[];
    categoriesId?: string[];
    blocked: boolean;
}