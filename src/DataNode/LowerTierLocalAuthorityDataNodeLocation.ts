import { LowerTierLocalAuthorityAreaName } from "../LowerTierLocalAuthorityAreaName";

const LOCATIONS: { [key in LowerTierLocalAuthorityAreaName]: [number, number] } = {
    Bolton: [0, 1],
    Bury: [1, 1],
    Manchester: [2, 2],
    Oldham: [2, 1],
    Rochdale: [1, 0],
    Salford: [1, 2],
    Stockport: [3, 3],
    Tameside: [3, 2],
    Trafford: [2, 3],
    Wigan: [0, 2],
};


export const locationOf = (areaName: LowerTierLocalAuthorityAreaName): [number, number] => {
    return LOCATIONS[areaName];
};