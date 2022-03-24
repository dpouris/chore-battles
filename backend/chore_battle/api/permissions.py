from rest_framework import permissions

class isOwner(permissions.BasePermission):
    def has_object_permission(self, request,view, obj):
        return request.user == obj.user and request.user.is_authenticated
        