function skillsMember () {
  return {
    restrict: 'E',
    templateUrl: 'templates/skills-member.html',
    controller: 'SkillsMemberCtrl',
    controllerAs: 'skillsMemberCtrl',
    bindToController: true,
    scope: {
      member: '='
    }
  };
}