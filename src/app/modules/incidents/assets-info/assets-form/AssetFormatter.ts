export default class AssetFormatter {

  static groupByOrgsAndCategories(assets: any[]) {
    const formattedOrganizations = [];
    for (const asset of assets) {
      let formattedOrg = AssetFormatter.getOrganization(formattedOrganizations, asset.organization.id);
      if (!formattedOrg) {
        formattedOrg = asset.organization;
        formattedOrg.mainCategories = [];
        formattedOrganizations.push(formattedOrg);
      }
      // check if org has category.
      let mainCategory;
      if (asset.category.assetsMainCategory) {
        // asset category has parent category.
        mainCategory = AssetFormatter.getMainCategoryFromOrganization(formattedOrg, asset.category.assetsMainCategory.id);
        if (!mainCategory) {
          mainCategory = asset.category.assetsMainCategory;
          mainCategory.categories = [];
          formattedOrg.mainCategories.push(mainCategory);
        }
      } else {
        // asset category not has parent category
        mainCategory = AssetFormatter.getMainCategoryFromOrganization(formattedOrg, -1);
        if (!mainCategory) {
          mainCategory = {
            id: -1,
            nameAr: 'غير معروف',
            nameEn: 'UnKnown',
            categories: []
          };
          formattedOrg.mainCategories.push(mainCategory);
        }
      }
      let formattedOrgCategory = AssetFormatter.getCategoryFromOrganization(formattedOrg, asset.category.id);
      if (!formattedOrgCategory) {
        formattedOrgCategory = asset.category;
        formattedOrgCategory.assets = [];
        mainCategory.categories.push(formattedOrgCategory);
      }
      // check assets for category.
      let formattedAsset = AssetFormatter.getAssetFromOrganization(formattedOrg, asset.id);
      if (!formattedAsset) {
        formattedAsset = {
          id: asset.id,
          nameAr: asset.nameAr,
          nameEn: asset.nameEn,
          quantity: asset.quantity,
          assetMeasuringType: asset.assetMeasuringType
        };
        formattedOrgCategory.assets.push(formattedAsset);
      }
    }
    return formattedOrganizations;
  }


  public static getOrganization(organizations: any[], orgId: number) {
    return organizations.find((org) => org.id === orgId);
  }

  public static getCategoryFromOrganization(organization: any, categoryId: number) {
    let category;
    for (const mainCategory of organization.mainCategories) {
      category = (mainCategory.categories as any[]).find((cat) => cat.id === categoryId);
      if (category) {
        break;
      }
    }
    return category;
  }

  public static getMainCategoryFromOrganization(organization: any, mainCategoryId: number) {
    return (organization.mainCategories as any[]).find((cat) => cat.id === mainCategoryId);
  }

  public static getAssetFromOrganization(organization: any, assetId: number) {
    let asset = null;
    for (const mainCategory of organization.mainCategories) {
      for (const category of mainCategory.categories) {
        for (const childAsset of category.assets) {
          if (childAsset.id === assetId) {
            asset = childAsset;
            break;
          }
        }
      }
    }
    return asset;
  }

}
