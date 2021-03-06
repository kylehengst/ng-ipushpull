declare namespace ipushpull {
    import IPromise = angular.IPromise;
    interface IRequestResult {
        success: boolean;
        data: any;
        httpCode: number;
        httpText: string;
    }
    interface IApiService {
        block: () => void;
        unblock: () => void;
        getSelfInfo: () => IPromise<IRequestResult>;
        refreshAccessTokens: (refreshToken: string) => IPromise<IRequestResult>;
        userLogin: (data: any) => IPromise<IRequestResult>;
        createFolder: (data: any) => IPromise<IRequestResult>;
        getDomains: () => IPromise<IRequestResult>;
        getDomain: (domainId: number) => IPromise<IRequestResult>;
        updateDomain: (data: any) => IPromise<IRequestResult>;
        getDomainPages: (domainId: number) => IPromise<IRequestResult>;
        getDomainsAndPages: () => IPromise<IRequestResult>;
        getPage: (data: any) => IPromise<IRequestResult>;
        getPageByName: (data: any) => IPromise<IRequestResult>;
        getPageAccess: (data: any) => IPromise<IRequestResult>;
        createPage: (data: any) => IPromise<IRequestResult>;
        savePageContent: (data: any) => IPromise<IRequestResult>;
        savePageContentDelta: (data: any) => IPromise<IRequestResult>;
        savePageSettings: (data: any) => IPromise<IRequestResult>;
        deletePage: (data: any) => IPromise<IRequestResult>;
        saveUserInfo: (data: any) => IPromise<IRequestResult>;
        getUserMetaData: (data: any) => IPromise<IRequestResult>;
        saveUserMetaData: (data: any) => IPromise<IRequestResult>;
        deleteUserMetaData: (data: any) => IPromise<IRequestResult>;
        changePassword: (data: any) => IPromise<IRequestResult>;
        changeEmail: (data: any) => IPromise<IRequestResult>;
        forgotPassword: (data: any) => IPromise<IRequestResult>;
        resetPassword: (data: any) => IPromise<IRequestResult>;
        inviteUsers: (data: any) => IPromise<IRequestResult>;
        acceptInvitation: (data: any) => IPromise<IRequestResult>;
        refuseInvitation: (data: any) => IPromise<IRequestResult>;
        domainInvitations: (data: any) => IPromise<IRequestResult>;
        userInvitations: () => IPromise<IRequestResult>;
        domainAccessLog: (data: any) => IPromise<IRequestResult>;
        domainUsers: (data: any) => IPromise<IRequestResult>;
        activateUser: (data: any) => IPromise<IRequestResult>;
        setDomainDefault: (data: any) => IPromise<IRequestResult>;
        resendInvite: (data: any) => IPromise<IRequestResult>;
        updateDomainAccess: (data: any) => IPromise<IRequestResult>;
        removeUsersFromDomain: (data: any) => IPromise<IRequestResult>;
        getInvitation: (data: any) => IPromise<IRequestResult>;
        cancelInvitations: (data: any) => IPromise<IRequestResult>;
        getDomainAccessGroups: (data: any) => IPromise<IRequestResult>;
        getDomainAccessGroup: (data: any) => IPromise<IRequestResult>;
        addDomainAccessGroup: (data: any) => IPromise<IRequestResult>;
        putDomainAgroupMembers: (data: any) => IPromise<IRequestResult>;
        putDomainAgroupPages: (data: any) => IPromise<IRequestResult>;
        updateDomainAgroup: (data: any) => IPromise<IRequestResult>;
        deleteDomainAGroup: (data: any) => IPromise<IRequestResult>;
        getDomainPageAccess: (data: any) => IPromise<IRequestResult>;
        getDomainCustomers: (data: any) => IPromise<IRequestResult>;
        saveDomainPageAccess: (data: any) => IPromise<IRequestResult>;
        getTemplates: (data: any) => IPromise<IRequestResult>;
        saveCustomer: (data: any) => IPromise<IRequestResult>;
        updateCustomer: (data: any) => IPromise<IRequestResult>;
        removeCustomer: (data: any) => IPromise<IRequestResult>;
        getDocEmailRules: (data: any) => IPromise<IRequestResult>;
        createDocEmailRule: (data: any) => IPromise<IRequestResult>;
        updateDocEmailRule: (data: any) => IPromise<IRequestResult>;
        deleteDocEmailRule: (data: any) => IPromise<IRequestResult>;
    }
}
